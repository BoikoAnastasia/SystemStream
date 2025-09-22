import { Link } from 'react-router-dom';
// mui
import { Box } from '@mui/material';
// styles
import { StyledCardVideo } from '../StylesComponents';
// types
import { IUserItem } from '../../types/share';

export const CardVideo = ({ item, styleProps }: { item: IUserItem; styleProps?: any }) => {
  return (
    <StyledCardVideo key={item.id}>
      <Link to={item.href}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <img src={item.img} alt="" style={styleProps} />
          <Box>
            <h4>{item.name}</h4>
            <span style={{ fontSize: '14px', color: 'var(--background-line)' }}>{item.users}</span>
          </Box>
        </Box>
      </Link>
    </StyledCardVideo>
  );
};
