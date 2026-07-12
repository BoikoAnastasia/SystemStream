import { FC, JSX, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { appLayout } from '../../layout/index';
import { useAppSelector } from '../../hooks/redux';
import { AppDispatch } from '../../store/store';
import { fetchUserOnlineStreams } from '../../store/actions/StreamsActions';
import { TabsComponent } from '../../components/ui/tabs/TabsComponent';
import { SectionListVideo } from '../../components/sectionListVideo/SectionListVideo';
import { ContainerBox } from '../../components/StylesComponents';
import { PaginationComponent } from '../../components/ui/pagination/PaginationComponent';
import { ContentWrapperSwitch } from '../../components/сontentWrapperSwitch/ContentWrapperSwitch';
import { EmptyBlock } from '../../components/helperBlock/HelperBlock';

const HOME_STREAMS_POLL_MS = 30_000;
const HOME_PAGE_SIZE = 25;

export const MainPage: FC = appLayout((): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, isError } = useAppSelector((state) => state.streams);
  const streams = data?.streams ?? [];
  const { page = 1, pageSize = HOME_PAGE_SIZE, totalStreams = 0 } = data ?? {};
  const pageCount = Math.max(1, Math.ceil(totalStreams / pageSize));

  useEffect(() => {
    dispatch(fetchUserOnlineStreams(page, HOME_PAGE_SIZE));
  }, [dispatch, page]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      dispatch(fetchUserOnlineStreams(page, HOME_PAGE_SIZE, { silent: true }));
    }, HOME_STREAMS_POLL_MS);
    return () => window.clearInterval(timer);
  }, [dispatch, page]);

  const getTabsComponents = () => [
    <ContentWrapperSwitch
      key="live"
      isLoading={isLoading}
      isError={isError}
      data={streams}
      text="Пока нет Live стримов"
      onRetry={() => dispatch(fetchUserOnlineStreams(page, HOME_PAGE_SIZE))}
    >
      <SectionListVideo list={streams} />
    </ContentWrapperSwitch>,
    <EmptyBlock key="videos" text="Записи стримов появятся здесь позже" />,
    <EmptyBlock key="clips" text="Клипы появятся здесь позже" />,
    <EmptyBlock key="users" text="Каталог пользователей в разработке" />,
  ];

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }} className="page">
      <ContainerBox>
        <TabsComponent propsChild={getTabsComponents()} propTabsTitle={['Live', 'Видео', 'Клипы', 'Пользователи']} />
        {streams.length > 0 && pageCount > 1 && (
          <PaginationComponent
            isSmall={false}
            count={pageCount}
            pageCurrent={page}
            functionDispatch={(nextPage) => dispatch(fetchUserOnlineStreams(nextPage, HOME_PAGE_SIZE))}
          />
        )}
      </ContainerBox>
    </Box>
  );
});
