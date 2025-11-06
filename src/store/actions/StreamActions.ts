import { getCookie } from '../../utils/cookieFunctions';
import { SettingsSlice } from '../slices/SettingsSlice';
import { StreamSlice } from '../slices/StreamSlice';
import { AppDispatch } from '../store';

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
    dispatch(SettingsSliceSuccess(data));
  } catch (error: any) {
    dispatch(SettingsSliceError(error.message || 'Не удалось получить ключ'));
  }
};

export const postStreamKey = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(SettingsSliceFetch());
    const token = getCookie('tokenData');
    if (!token) return;
    const response = await fetch(`${process.env.REACT_APP_API_USER}/stream-key/regenerate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      const error = await response.json();
      console.error('Не удалось изменить ключ:', error.message || response.statusText);
    }

    const data = await response.json();
    dispatch(SettingsSliceSuccess(data));
  } catch (error: any) {
    dispatch(SettingsSliceError(error.message || 'Не удалось поменять ключ'));
  }
};

// Получение StreamView
// отправка каждые несколько секунд
export const fetchStreamView = (nickname: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(StreamSliceFetch());
    // const token = getCookie('tokenData');
    // if (!token) return;
    // console.log('token:', token);
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

// "streamId": 9,
// "streamName": "sanyas's Stream",
// "streamerName": "sanyas",
// "streamerId": 7,
// "tags": [],
// "previewlUrl": null,
// "hlsUrl": "/hls/live_7_ae3dae00389b443a80865d721fabfd9e.m3u8",
// "totalViews": 0,
// "startedAt": "2025-11-05T14:02:13.271529Z",
// "isLive": false
