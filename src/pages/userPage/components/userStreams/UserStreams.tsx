import React from 'react';
import { PaginationComponent } from '../../../../components/ui/pagination/PaginationComponent';
import { IStreamHistoryData } from '../../../../types/share';
import { fecthStreamHistory } from '../../../../store/actions/StreamsActions';
import {
  StyledVideoCard,
  StyledVideoCardInfo,
  StyledVideoCardLink,
  StyledVideoGrid,
} from '../../../../components/StylesComponents';
import { Box, CardMedia } from '@mui/material';

export const UserStreams = ({ dataStreams }: { dataStreams: IStreamHistoryData | null }) => {
  if (!dataStreams) return <Box>Нет данных</Box>;
  const pageCurrent = Math.ceil(dataStreams.pageSize / dataStreams.totalStreams);
  return (
    <>
      <StyledVideoGrid>
        {(dataStreams.streams ?? []).map((item) => (
          <StyledVideoCard key={item.id}>
            <StyledVideoCardLink to="/" />
            <CardMedia component="img" height="200" image={'./img/preview/preview-01.jpg'} alt="video preview" />
            <StyledVideoCardInfo>
              {/* <CardDrawerTypography fs={'18px'} sx={{ fontWeight: 600 }} isEllipsis={false}>
                {item.streamName}
              </CardDrawerTypography>
              <CardDrawerTypography fs={'14px'} c={'var(--hover-header-menu)'} isEllipsis={false}>
                {item.streamersLeague}
              </CardDrawerTypography> */}
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
