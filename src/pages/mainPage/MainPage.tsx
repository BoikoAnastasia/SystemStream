import { FC, JSX, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { appLayout } from '../../layout/index';
import { useAppSelector } from '../../hooks/redux';
import { AppDispatch } from '../../store/store';
import { fetchUserOnlineStreams } from '../../store/actions/StreamsActions';
import { SectionListVideo } from '../../components/sectionListVideo/SectionListVideo';
import { ContainerBox } from '../../components/StylesComponents';
import { PaginationComponent } from '../../components/ui/pagination/PaginationComponent';
import { ContentWrapperSwitch } from '../../components/сontentWrapperSwitch/ContentWrapperSwitch';

const HOME_STREAMS_POLL_MS = 30_000;
const HOME_PAGE_SIZE = 25;

export const MainPage: FC = appLayout((): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryIdParam = searchParams.get('category');
  const tag = searchParams.get('tag');
  const categoryId = categoryIdParam ? Number(categoryIdParam) : null;
  const activeCategoryId = categoryId && Number.isFinite(categoryId) && categoryId > 0 ? categoryId : null;

  const { data, isLoading, isError } = useAppSelector((state) => state.streams);
  const streams = data?.streams ?? [];
  const { page = 1, pageSize = HOME_PAGE_SIZE, totalStreams = 0 } = data ?? {};
  const pageCount = Math.max(1, Math.ceil(totalStreams / pageSize));
  const categoryLabel = useMemo(
    () => streams.find((s) => s.categoryId === activeCategoryId)?.categoryName || null,
    [streams, activeCategoryId]
  );

  useEffect(() => {
    dispatch(fetchUserOnlineStreams(page, HOME_PAGE_SIZE, { categoryId: activeCategoryId, tag }));
  }, [dispatch, page, activeCategoryId, tag]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      dispatch(fetchUserOnlineStreams(page, HOME_PAGE_SIZE, { silent: true, categoryId: activeCategoryId, tag }));
    }, HOME_STREAMS_POLL_MS);
    return () => window.clearInterval(timer);
  }, [dispatch, page, activeCategoryId, tag]);

  const emptyText = activeCategoryId
    ? 'В этой категории сейчас нет Live стримов'
    : tag
      ? 'По этому тегу сейчас нет Live стримов'
      : 'Пока нет Live стримов';

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }} className="page">
      <ContainerBox>
        {activeCategoryId && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>
              Категория{categoryLabel ? `: ${categoryLabel}` : ` #${activeCategoryId}`}
            </Typography>
            <Button
              size="small"
              onClick={() => navigate('/')}
              sx={{ textTransform: 'none', color: 'rgba(255,255,255,0.7)' }}
            >
              Сбросить
            </Button>
          </Box>
        )}
        {tag && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Тег: {tag}</Typography>
            <Button
              size="small"
              onClick={() => navigate('/')}
              sx={{ textTransform: 'none', color: 'rgba(255,255,255,0.7)' }}
            >
              Сбросить
            </Button>
          </Box>
        )}
        <ContentWrapperSwitch
          isLoading={isLoading}
          isError={isError}
          data={streams}
          text={emptyText}
          onRetry={() => dispatch(fetchUserOnlineStreams(page, HOME_PAGE_SIZE, { categoryId: activeCategoryId, tag }))}
        >
          <SectionListVideo list={streams} />
        </ContentWrapperSwitch>
        {streams.length > 0 && pageCount > 1 && (
          <PaginationComponent
            isSmall={false}
            count={pageCount}
            pageCurrent={page}
            functionDispatch={(nextPage) =>
              dispatch(fetchUserOnlineStreams(nextPage, HOME_PAGE_SIZE, { categoryId: activeCategoryId, tag }))
            }
          />
        )}
      </ContainerBox>
    </Box>
  );
});
