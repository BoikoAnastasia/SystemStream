import StreamsHistoryReducer, { StreamsHistoryFetchSuccess } from '../slices/StreamsHistorySlice';

describe('StreamsHistorySlice robustness', () => {
  test('StreamsHistoryFetchSuccess does not throw when payload is null', () => {
    const initState = StreamsHistoryReducer(undefined as any, { type: '@@INIT' } as any);

    // Adversarial: corrupted backend contract
    expect(() => StreamsHistoryReducer(initState, StreamsHistoryFetchSuccess(null as any))).not.toThrow();
  });

  test('StreamsHistoryFetchSuccess does not throw when payload is undefined', () => {
    const initState = StreamsHistoryReducer(undefined as any, { type: '@@INIT' } as any);

    // Adversarial: missing hub message payload
    expect(() => StreamsHistoryReducer(initState, StreamsHistoryFetchSuccess(undefined as any))).not.toThrow();
  });

  test('StreamsHistoryFetchSuccess should normalize invalid payload.data to null', () => {
    const initState = StreamsHistoryReducer(undefined as any, { type: '@@INIT' } as any);

    const nextState = StreamsHistoryReducer(
      initState,
      StreamsHistoryFetchSuccess({ data: 'not-an-object', nickname: 'nick' } as any)
    );

    // Defensive expectation: wrong backend contract should not corrupt slice state.
    expect(nextState.data).toBeNull();
    expect(nextState.lastNickname).toBeNull();
  });

  test('StreamsHistoryFetchSuccess should normalize invalid payload.nickname to null', () => {
    const initState = StreamsHistoryReducer(undefined as any, { type: '@@INIT' } as any);

    const validData = { page: 1, pageSize: 5, totalStreams: 0, streams: [] };

    const nextState = StreamsHistoryReducer(
      initState,
      StreamsHistoryFetchSuccess({ data: validData, nickname: 123 } as any)
    );

    expect(nextState.lastNickname).toBeNull();
  });
});
