import { setupStore } from '../store';
import { fetchUserOnlineStreams } from '../actions/StreamsActions';
import { StreamsSliceFetch, StreamsSliceFetchError } from '../slices/StreamsSlice';
import { fetchLiveStreamsFromApi } from '../../api/liveStreamsApi';

jest.mock('../../api/liveStreamsApi', () => ({
  fetchLiveStreamsFromApi: jest.fn(),
  normalizeOnlineUser: jest.fn(),
}));

const mockedFetchLiveStreamsFromApi = fetchLiveStreamsFromApi as jest.MockedFunction<typeof fetchLiveStreamsFromApi>;

describe('Streams silent polling robustness', () => {
  test('silent fetch error clears stale streams isError', async () => {
    const store = setupStore();
    store.dispatch(StreamsSliceFetchError('prev streams error') as any);

    mockedFetchLiveStreamsFromApi.mockResolvedValueOnce({
      data: null,
      error: 'silent polling failed',
    } as any);

    await store.dispatch(fetchUserOnlineStreams(1, 25, { silent: true, categoryId: null, tag: null }) as any);

    // Expected: background refresh failures should not keep showing an old error banner.
    expect(store.getState().streams.isError).toBeNull();
  });

  test('silent fetch success clears stale streams isLoading', async () => {
    const store = setupStore();

    // Simulate previous non-silent request still having spinner enabled.
    store.dispatch(StreamsSliceFetch() as any);

    mockedFetchLiveStreamsFromApi.mockResolvedValueOnce({
      data: { streams: [], page: 1, pageSize: 25, totalStreams: 0 },
      error: null,
    } as any);

    await store.dispatch(fetchUserOnlineStreams(1, 25, { silent: true, categoryId: null, tag: null }) as any);

    expect(store.getState().streams.isLoading).toBe(false);
    expect(store.getState().streams.isError).toBeNull();
  });

  test('silent fetch error clears stale streams isLoading', async () => {
    const store = setupStore();

    // Simulate previous non-silent request still having spinner enabled.
    store.dispatch(StreamsSliceFetch() as any);

    mockedFetchLiveStreamsFromApi.mockResolvedValueOnce({
      data: null,
      error: 'silent polling failed',
    } as any);

    await store.dispatch(fetchUserOnlineStreams(1, 25, { silent: true, categoryId: null, tag: null }) as any);

    expect(store.getState().streams.isLoading).toBe(false);
    expect(store.getState().streams.isError).toBeNull();
  });
});
