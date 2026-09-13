import { render, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { MainPage } from '../../../pages/mainPage/MainPage';
import { useAppSelector } from '../../../hooks/redux';
import { fetchUserOnlineStreams } from '../../../store/actions/StreamsActions';

jest.mock('../../../layout', () => ({
  appLayout: (Component: any) => Component,
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock(
  'react-router-dom',
  () => ({
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
  }),
  { virtual: true }
);

jest.mock('../../../hooks/redux', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('../../../store/actions/StreamsActions', () => ({
  fetchUserOnlineStreams: jest.fn(),
}));

jest.mock('../../../components/sectionListVideo/SectionListVideo', () => ({
  SectionListVideo: ({ list }: { list: Array<{ streamName: string }> }) => (
    <div data-testid="section-list">{list.map((item) => item.streamName).join(', ')}</div>
  ),
}));

jest.mock('../../../components/StylesComponents', () => ({
  ContainerBox: ({ children }: { children: React.ReactNode }) => <div data-testid="container-box">{children}</div>,
}));

jest.mock('../../../components/ui/pagination/PaginationComponent', () => ({
  PaginationComponent: () => <div data-testid="pagination" />,
}));

jest.mock('../../../components/сontentWrapperSwitch/ContentWrapperSwitch', () => ({
  ContentWrapperSwitch: ({ data, isLoading, isError, children, text }: any) => {
    if (isLoading) return <div data-testid="loader">Loading...</div>;
    if (isError) return <div data-testid="error">{String(isError)}</div>;
    if (!data || data.length === 0) return <div data-testid="empty">{text}</div>;
    return <div data-testid="content">{children}</div>;
  },
}));

const { useNavigate, useSearchParams } = jest.requireMock('react-router-dom') as {
  useNavigate: jest.Mock;
  useSearchParams: jest.Mock;
};

describe('MainPage', () => {
  const dispatchMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    useNavigate.mockReturnValue(navigateMock);
    useSearchParams.mockReturnValue([new URLSearchParams('')]);
    (fetchUserOnlineStreams as unknown as jest.Mock).mockReturnValue({ type: 'FETCH_STREAMS' });
  });

  test('renders empty live state and requests the first page', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      data: { streams: [], page: 1, pageSize: 25, totalStreams: 0 },
      isLoading: false,
      isError: false,
    });

    render(<MainPage />);

    expect(screen.getByTestId('empty')).toHaveTextContent('Пока нет Live стримов');
    expect(fetchUserOnlineStreams).toHaveBeenCalledWith(1, 25, { categoryId: null, tag: null });
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'FETCH_STREAMS' });
  });

  test('renders category header and list for category-filtered streams', () => {
    useSearchParams.mockReturnValue([new URLSearchParams('category=3')]);
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      data: {
        streams: [{ streamName: 'Test stream', categoryId: 3, categoryName: 'Just Chatting' }],
        page: 1,
        pageSize: 25,
        totalStreams: 1,
      },
      isLoading: false,
      isError: false,
    });

    render(<MainPage />);

    expect(screen.getByText('Категория: Just Chatting')).toBeInTheDocument();
    expect(screen.getByTestId('section-list')).toHaveTextContent('Test stream');
  });

  test('does not crash when API returns a non-array streams payload', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      data: {
        streams: { broken: true },
        page: 1,
        pageSize: 25,
        totalStreams: 1,
      },
      isLoading: false,
      isError: false,
    });

    expect(() => render(<MainPage />)).not.toThrow();
    expect(screen.getByTestId('empty')).toHaveTextContent('Пока нет Live стримов');
  });
});
