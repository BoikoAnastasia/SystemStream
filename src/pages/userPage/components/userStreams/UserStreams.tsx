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
  const pageCurrent = Math.ceil(dataStreams.pageSize / dataStreams.totalStreams);
  return (
    <>
      <StyledVideoGrid>
        {(dataStreams.streams ?? []).map((item) => (
          <StyledVideoCard key={item.id}>
            <StyledVideoCardLink to="/" />
            <CardMedia component="img" height="200" image={'./img/preview/preview-01.jpg'} alt="video preview" />
            <StyledVideoCardInfo>
              <CardDrawerTypography fs={'14px'} sx={{ fontWeight: 600 }} isEllipsis={false}>
                {formatDate(new Date(item.startedAt), 'date')}
              </CardDrawerTypography>
              <CardDrawerTypography fs={'14px'} c={'var(--hover-header-menu)'} isEllipsis={false}>
                Длительность: {getStreamDuration(item.startedAt, item.endedAt)}
              </CardDrawerTypography>
              <CardDrawerTypography fs={'14px'} c={'var(--hover-header-menu)'} isEllipsis={false}>
                Категории: не выбрано
              </CardDrawerTypography>
            </StyledVideoCardInfo>
          </StyledVideoCard>
        ))}
      </StyledVideoGrid>

      <PaginationComponent
        count={dataStreams.page}
        pageCurrent={pageCurrent}
        isSmall={false}
        functionDispatch={() => fecthStreamHistory('')}
      />
    </>
  );
};
