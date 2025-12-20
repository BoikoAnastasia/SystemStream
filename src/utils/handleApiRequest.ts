import { AppDispatch } from '../store/store';
import { IApiResponse } from '../types/share';

export const handleApiRequest = async <T = any>(
  url: string,
  options?: RequestInit,
  dispatch?: AppDispatch,
  onSuccess?: (data: T) => void
): Promise<IApiResponse<T>> => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      // Можно проверять код ошибки и формировать сообщение
      const message = data?.message || `Ошибка сервера (${response.status})`;
      return { success: false, message, code: response.status };
    }

    if (dispatch && onSuccess) {
      onSuccess(data);
    }

    return { success: true, data, message: 'OK', code: response.status };
  } catch (error: any) {
    return { success: false, message: error.message || 'Неизвестная ошибка' };
  }
};
