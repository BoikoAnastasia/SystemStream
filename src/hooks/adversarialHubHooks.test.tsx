import { act, renderHook } from '@testing-library/react';
import type { IProfile } from '../types/share';

const mockGetCookie = jest.fn();
const mockCreateGuestKey = jest.fn(() => 'guest-key');

jest.mock('../utils/cookieFunctions', () => ({
  getCookie: (...args: unknown[]) => mockGetCookie(...args),
}));

jest.mock('../utils/createGuestKey', () => ({
  createGuestKey: () => mockCreateGuestKey(),
}));

type HubHandler = (...args: any[]) => void;

const mockBuilderState = {
  hub: null as FakeHub | null,
};

jest.mock('@microsoft/signalr', () => ({
  HubConnectionState: {
    Disconnected: 'Disconnected',
    Connected: 'Connected',
  },
  HubConnectionBuilder: class {
    withUrl() {
      return this;
    }
    withAutomaticReconnect() {
      return this;
    }
    build() {
      if (!mockBuilderState.hub) {
        throw new Error('No fake hub configured');
      }
      return mockBuilderState.hub;
    }
  },
}));

class FakeHub {
  state: string;
  handlers = new Map<string, Set<HubHandler>>();
  reconnectedHandler: HubHandler | null = null;
  invoke = jest.fn(async (..._args: unknown[]) => undefined);
  start = jest.fn(async () => undefined);
  stop = jest.fn(async () => undefined);

  constructor(state = 'Connected') {
    this.state = state;
  }

  on(event: string, handler: HubHandler) {
    const handlers = this.handlers.get(event) ?? new Set<HubHandler>();
    handlers.add(handler);
    this.handlers.set(event, handlers);
  }

  off(event: string, handler: HubHandler) {
    this.handlers.get(event)?.delete(handler);
  }

  onreconnected(handler: HubHandler) {
    this.reconnectedHandler = handler;
  }

  emit(event: string, payload?: unknown) {
    const handlers = Array.from(this.handlers.get(event) ?? []);
    for (const handler of handlers) {
      handler(payload);
    }
  }
}

const flushMicrotasks = async () => {
  await act(async () => {
    await Promise.resolve();
  });
};

describe('adversarial frontend hook regressions', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    mockBuilderState.hub = null;
    mockGetCookie.mockReturnValue('token');
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('useChat should keep the second pending duplicate message after only one echo returns', async () => {
    const hub = new FakeHub('Connected');
    const profile = { id: 7, nickname: 'alice' } as IProfile;
    const { useChat } = await import('./hubs/useChat');
    const { result } = renderHook(() => useChat(hub as any, 'alice', profile));

    await flushMicrotasks();

    act(() => {
      void result.current.sendMessage('same text');
      void result.current.sendMessage('same text');
    });

    act(() => {
      hub.emit('ReceiveChatMessage', {
        id: 'server-1',
        userId: 7,
        username: 'alice',
        text: 'same text',
        role: 'User',
        timestamp: '2026-08-19T15:54:00.000Z',
        offsetSeconds: 0,
      });
    });

    expect(result.current.messages).toHaveLength(2);
  });

  test('useChat should ignore stale delete events from the previous stream session', async () => {
    const hub = new FakeHub('Connected');
    const profile = { id: 7, nickname: 'alice' } as IProfile;
    const { useChat } = await import('./hubs/useChat');
    const { result, rerender } = renderHook(({ streamNickname }) => useChat(hub as any, streamNickname, profile), {
      initialProps: { streamNickname: 'stream-a' },
    });

    await flushMicrotasks();

    act(() => {
      hub.emit('ReceiveChatMessage', {
        id: 'shared-id',
        userId: 11,
        username: 'bob',
        text: 'first stream message',
        role: 'User',
        timestamp: '2026-08-19T15:54:00.000Z',
        offsetSeconds: 0,
      });
    });

    const staleDeleteHandler = Array.from(hub.handlers.get('ChatMessageDeleted') ?? [])[0];

    rerender({ streamNickname: 'stream-b' });
    await flushMicrotasks();

    act(() => {
      hub.emit('ReceiveChatMessage', {
        id: 'shared-id',
        userId: 11,
        username: 'bob',
        text: 'second stream message',
        role: 'User',
        timestamp: '2026-08-19T15:55:00.000Z',
        offsetSeconds: 0,
      });
    });

    act(() => {
      staleDeleteHandler?.({
        messageId: 'shared-id',
        deletedText: 'first stream message',
      });
    });

    expect(result.current.messages[0]?.isDeleted).toBe(false);
    expect(result.current.messages[0]?.text).toBe('second stream message');
  });

  test('useStreamHub should ignore offline events with string false isLive payloads', async () => {
    const hub = new FakeHub('Connected');
    mockBuilderState.hub = hub;

    const { useStreamHub } = await import('./hubs/useStreamHub');
    const { result } = renderHook(() => useStreamHub({ nickname: 'streamer', userData: { id: 12 } }));

    await flushMicrotasks();

    act(() => {
      hub.emit('StreamStatusChanged', {
        Status: 'offline',
        Stream: {
          IsLive: 'false',
          StreamId: 99,
          StreamName: 'Ghost stream',
          StreamerId: 12,
          StreamerName: 'streamer',
          HlsUrl: '',
          TotalViews: 1,
          StartedAt: '2026-08-19T15:54:00.000Z',
        },
      });
    });

    expect(result.current.currentStream).toBeNull();
  });

  test('useStreamHub should rebuild hub when auth token appears after login', async () => {
    const guestHub = new FakeHub('Connected');
    const authHub = new FakeHub('Connected');
    mockBuilderState.hub = guestHub;
    mockGetCookie.mockReturnValue('');

    const { useStreamHub } = await import('./hubs/useStreamHub');
    const { rerender } = renderHook(
      ({ authUserId }: { authUserId: number | null }) =>
        useStreamHub({ nickname: 'streamer', userData: { id: 12 }, authUserId }),
      { initialProps: { authUserId: null as number | null } }
    );

    await flushMicrotasks();
    expect(guestHub.start).toHaveBeenCalled();

    mockGetCookie.mockImplementation((name: string) => (name === 'sp_auth' ? '1' : ''));
    mockBuilderState.hub = authHub;

    rerender({ authUserId: 42 });
    await flushMicrotasks();

    expect(guestHub.stop).toHaveBeenCalled();
    expect(authHub.start).toHaveBeenCalled();
    expect(authHub.invoke.mock.calls.some((call) => call[0] === 'JoinStream' && call[1] === 'streamer')).toBe(true);
  });

  test('useStreamHub should not rebuild hub when profile hydrates but cookie already matched', async () => {
    const hub = new FakeHub('Connected');
    mockBuilderState.hub = hub;
    mockGetCookie.mockImplementation((name: string) => (name === 'sp_auth' ? '1' : ''));

    const { useStreamHub } = await import('./hubs/useStreamHub');
    const { rerender } = renderHook(
      ({ authUserId }: { authUserId: number | null }) =>
        useStreamHub({ nickname: 'streamer', userData: { id: 12 }, authUserId }),
      { initialProps: { authUserId: null as number | null } }
    );

    await flushMicrotasks();
    const startsAfterMount = hub.start.mock.calls.length;

    rerender({ authUserId: 42 });
    await flushMicrotasks();

    expect(hub.stop).not.toHaveBeenCalled();
    expect(hub.start.mock.calls.length).toBe(startsAfterMount);
  });

  test('useStreamHub should accept string true isLive payloads as a live stream', async () => {
    const hub = new FakeHub('Connected');
    mockBuilderState.hub = hub;

    const { useStreamHub } = await import('./hubs/useStreamHub');
    const { result } = renderHook(() => useStreamHub({ nickname: 'streamer', userData: { id: 12 } }));

    await flushMicrotasks();

    act(() => {
      hub.emit('StreamStatusChanged', {
        Status: 'live',
        Stream: {
          IsLive: 'true',
          StreamId: 100,
          StreamName: 'Real stream',
          StreamerId: 12,
          StreamerName: 'streamer',
          HlsUrl: 'https://cdn/live.m3u8',
          TotalViews: 5,
          StartedAt: '2026-08-19T15:54:00.000Z',
        },
      });
    });

    expect(result.current.currentStream?.streamId).toBe(100);
    expect(result.current.currentStream?.isLive).toBe(true);
  });
});
