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
  CardTypography,
  StyledVideoCard,
  StyledVideoCardInfo,
  StyledVideoCardLink,
} from '../../../../components/StylesComponents';
import { StyledVideoGrid } from '../../StyledUserPage';

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
              <CardTypography fs={'16px'} sx={{ fontWeight: 500 }} isEllipsis={false}>
                {item.streamName}
              </CardTypography>
              <CardTypography fs={'14px'} isEllipsis={false}>
                {formatDate(new Date(item.startedAt), 'date')}
              </CardTypography>
              {item?.endedAt && (
                <CardTypography fs={'14px'} c={'var(--hover-header-menu)'} isEllipsis={false}>
                  Длительность: {getStreamDuration(item.startedAt, item.endedAt)}
                </CardTypography>
              )}
              <CardTypography fs={'14px'} c={'var(--hover-header-menu)'} isEllipsis={false}>
                {item.categoryName && `Категория: ${item.categoryName}`}
              </CardTypography>
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
