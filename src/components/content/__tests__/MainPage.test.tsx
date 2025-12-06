// import { IStreamsData } from '../../../types/share';
// import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router-dom';
// import { MainPage } from '../../../pages/mainPage/MainPage';
// import { render, screen } from '@testing-library/react';
// import { configureStore } from '@reduxjs/toolkit';
// import streamsSlice from '../../../store/slices/StreamsSlice';

// jest.mock('../../layout', () => ({
//   appLayout: (Component: any) => Component,
// }));

// jest.mock('../../sectionListVideo/SectionListVideo', () => ({
//   SectionListVideo: ({ streams }: IStreamsData) => <div data-testid="section-list">{streams.length} items</div>,
// }));

// jest.mock('../../сontentWrapperSwitch/ContentWrapperSwitch', () => ({
//   ContentWrapperSwitch: ({ data, isLoading, isError, children, text }: any) => {
//     if (isLoading) return <div data-testid="loader">Loading...</div>;
//     if (isError) return <div data-testid="error">String(isError)</div>;
//     if (!data || data.length === 0) return <div data-testid="empty">{text}</div>;
//     return <div data-testid="content">{children}</div>;
//   },
// }));

// const mockStore = (preloadedState: any) => {
//   configureStore({
//     reducer: {
//       streams: streamsSlice,
//     },
//     preloadedState: preloadedState,
//   });
// };
// const renderPage = (preloadedState: any) => {
//   const store = mockStore(preloadedState);

//   return render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <MainPage />
//       </MemoryRouter>
//     </Provider>
//   );
// };

// describe('mainPage test', () => {
//   test('Рендерит Loader при isLoading = true', () => {
//     renderPage({
//       streams: {
//         data: null,
//         isLoading: true,
//         isError: false,
//       },
//     });
//     expect(screen.getByTestId('loader')).toBeInTheDocument();
//   });

//   test('рендерит ошибку isError', () => {
//     renderPage({
//       streams: {
//         data: null,
//         isLoading: false,
//         isError: 'Ошибка загрузки',
//       },
//     });
//     expect(screen.getByTestId('error')).toBeInTheDocument();
//   });

//   test('рендерит пустой блок при пустых streams', () => {
//     renderPage({
//       streams: {
//         data: { streams: [], page: 1, pageSize: 25, totalStreams: 0 },
//         isLoading: false,
//         isError: false,
//       },
//     });
//     expect(screen.getByTestId('empty')).toBeInTheDocument();
//     expect(screen.getByTestId('empty')).toHaveTextContent('Пока нет Live стримов');
//   });

//   test('рендерит контент при наличии streams', () => {
//     renderPage({
//       streams: {
//         data: {
//           streams: [{ streamId: 1, streamName: 'Test stream' }],
//           page: 1,
//           pageSize: 25,
//           totalStreams: 1,
//         },
//         isLoading: false,
//         isError: false,
//       },
//     });

//     expect(screen.getByTestId('content')).toBeInTheDocument();
//     expect(screen.getByTestId('section-list')).toHaveTextContent('1 items');
//   });
// });
