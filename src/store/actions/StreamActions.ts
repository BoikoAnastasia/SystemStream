// store, slices
import { AppDispatch } from '../store';
import { SettingsSlice } from '../slices/SettingsSlice';
import { StreamSlice } from '../slices/StreamSlice';
// utils
import { getCookie } from '../../utils/cookieFunctions';
import { handleApiRequest } from '../../utils/handleApiRequest';

const { SettingsSliceFetch, SettingsSliceError, SettingsSliceSuccess } = SettingsSlice.actions;
const { StreamSliceError, StreamSliceFetch, StreamSliceSuccess } = StreamSlice.actions;

// stream
export const fetchStreamKey = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(SettingsSliceFetch());
    const token = getCookie('tokenData');
    if (!token) return;
    const response = await fetch(`${process.env.REACT_APP_API_USER}/stream-key`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      const error = await response.json();
      console.error('Не удалось получить ключ:', error.message || response.statusText);
    }

    const data = await response.json();
    dispatch(
      SettingsSliceSuccess({
        streamKey: data.streamKey ?? data.StreamKey ?? '',
        streamingBlocked: Boolean(data.streamingBlocked ?? data.StreamingBlocked),
        blockMessage: (data.blockMessage ?? data.BlockMessage ?? null) as string | null,
        blockType: (data.blockType ?? data.BlockType ?? null) as string | null,
        blockReason: (data.blockReason ?? data.BlockReason ?? null) as string | null,
        blockExpiresAt: (data.blockExpiresAt ?? data.BlockExpiresAt ?? null) as string | null,
        blockSanctionId: (data.blockSanctionId ?? data.BlockSanctionId ?? null) as number | null,
      })
    );
  } catch (error: any) {
    dispatch(SettingsSliceError(error.message || 'Не удалось получить ключ'));
  }
};

// Получение StreamView
export const fetchStreamView = (nickname: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(StreamSliceFetch());
    const response = await fetch(`${process.env.REACT_APP_API_STREAM_VIEW}/${nickname}`);
    console.log(response);
    if (!response.ok) {
      const error = await response.json();
      console.error('Ошибка авторизации:', error.message || response.statusText);
    }
    const data = await response.json();
    dispatch(StreamSliceSuccess(data));
  } catch (error) {
    dispatch(StreamSliceError(error));
  }
};

// get stream status
export const fetchStatusCurrentStream = async () => {
  const token = getCookie('tokenData');
  if (!token) return { success: false, message: 'Вы не авторизованы' };
  return handleApiRequest(`${process.env.REACT_APP_API_STREAM}/status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
