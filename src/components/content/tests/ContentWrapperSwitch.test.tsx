import { render, screen } from '@testing-library/react';
import { ContentWrapperSwitch } from '../../сontentWrapperSwitch/ContentWrapperSwitch';
import userEvent from '@testing-library/user-event';

jest.mock('../../ui/loader/Loader', () => ({
  Loader: () => <div data-testid="loader">loader</div>,
}));

jest.mock('../../helperBlock/HelperBlock', () => ({
  EmptyBlock: ({ text }: { text: string }) => <div data-testid="empty">{text}</div>,
  ErrorBlock: ({ error, onRetry }: { error: any; onRetry: () => void }) => (
    <div data-testid="error">
      <span>{String(error)}</span>
      <button data-testid="retry-button" onClick={onRetry}>
        retry
      </button>
    </div>
  ),
}));

const Сhild = () => <div data-testid="child">children here</div>;
const baseProps = {
  isLoading: false,
  isError: null,
  data: [
    {
      streamName: 'стример',
      profileImage: '',
      isOnline: true,
      streamersLeague: '',
      previewUrl: '',
      streamId: 1,
      nickname: 'test',
    },
  ],
  text: 'Пока нет Live стримов',
};

describe('ContentWrapperSwitch', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('рендерит Loader, когда isLoading=true', () => {
    render(<ContentWrapperSwitch {...baseProps} isLoading={true} children={<Сhild />} onRetry={jest.fn()} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  test('рендерит EmptyBlock, если stream пустой массив', () => {
    render(<ContentWrapperSwitch {...baseProps} data={[]} children={<Сhild />} onRetry={jest.fn()} />);
    expect(screen.getByTestId('empty')).toBeInTheDocument();
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  test('рендерит ErrorBlock при isError и вызывает onRetry при клике', async () => {
    const onRetryMock = jest.fn();
    render(
      <ContentWrapperSwitch {...baseProps} isError={'Ошибка загрузки'} children={<Сhild />} onRetry={onRetryMock} />
    );
    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByText('Ошибка загрузки')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('retry-button'));
    expect(onRetryMock).toHaveBeenCalledTimes(1);

    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  test('рендерит children если есть данные и нет ошибок', () => {
    render(<ContentWrapperSwitch {...baseProps} children={<Сhild />} onRetry={jest.fn()} />);
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('empty')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });
});
