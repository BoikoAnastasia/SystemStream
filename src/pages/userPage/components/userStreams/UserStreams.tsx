// store
import { fecthStreamHistory } from '../../../../store/actions/StreamsActions';
// components
import { PaginationComponent } from '../../../../components/ui/pagination/PaginationComponent';
// utils
import { formatDate, getStreamDuration } from '../../../../utils/formatDate';
//mui
import { CardMedia } from '@mui/material';
// styles, types
import { IStreamHistoryData } from '../../../../types/share';
import {
  CardDrawerTypography,
  StyledVideoCard,
  StyledVideoCardInfo,
  StyledVideoCardLink,
  StyledVideoGrid,
} from '../../../../components/StylesComponents';

export const UserStreams = ({ dataStreams }: { dataStreams: IStreamHistoryData }) => {
  const totalPages = Math.ceil(dataStreams.totalStreams / dataStreams.pageSize);
  const pageCurrent = dataStreams.page;

  return (
    <>
      <StyledVideoGrid sx={{ marginBottom: '20px' }}>
        {(dataStreams.streams ?? []).map((item) => (
          <StyledVideoCard key={item.id}>
            <StyledVideoCardLink to="/" />
            <CardMedia component="img" height="200" image={'./img/preview/preview-01.jpg'} alt="video preview" />
            <StyledVideoCardInfo>
              <CardDrawerTypography fs={'16px'} sx={{ fontWeight: 500 }} isEllipsis={false}>
                {item.streamName}
              </CardDrawerTypography>
              <CardDrawerTypography fs={'14px'} isEllipsis={false}>
                {formatDate(new Date(item.startedAt), 'date')}
              </CardDrawerTypography>
              {item?.endedAt && (
                <CardDrawerTypography fs={'14px'} c={'var(--hover-header-menu)'} isEllipsis={false}>
                  Длительность: {getStreamDuration(item.startedAt, item.endedAt)}
                </CardDrawerTypography>
              )}
              <CardDrawerTypography fs={'14px'} c={'var(--hover-header-menu)'} isEllipsis={false}>
                {item.categoryName && `Категория: ${item.categoryName}`}
              </CardDrawerTypography>
            </StyledVideoCardInfo>
          </StyledVideoCard>
        ))}
      </StyledVideoGrid>

      <PaginationComponent
        count={totalPages}
        pageCurrent={pageCurrent}
        isSmall={false}
        functionDispatch={() => fecthStreamHistory('')}
      />
    </>
  );
};
