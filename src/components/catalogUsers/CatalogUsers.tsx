// mui
import { Avatar, Grid } from '@mui/material';
// hooks
import { useDeviceDetect } from '../../hooks/useDeviceDetect';
// styled
import {
  StyledAvatarWrap,
  StyledButtonLive,
  StyledSubscribeButton,
  StyledUserCard,
  StyledUserName,
  StyledUsersGrid,
} from '../StylesComponents';
// types
import { IUser } from '../../types/share';

export const CatalogUsers = ({ list }: { list: IUser[] }) => {
  const { isMobile } = useDeviceDetect();

  return (
    <>
      <StyledUsersGrid container spacing={1}>
        {list.map((u) => (
          <Grid columnSpacing={{ xs: 12, sm: 6, md: 2 }} minWidth={isMobile ? 110 : 220} key={u.id}>
            <StyledUserCard>
              <StyledAvatarWrap>
                {u.live ? (
                  <StyledButtonLive sx={{ position: 'absolute', top: '10px', left: '10px' }}>LIVE</StyledButtonLive>
                ) : (
                  <></>
                )}
                <Avatar
                  src={u.avatar}
                  sx={{
                    width: 84,
                    height: 84,
                    border: '3px solid var(--background-tabs)',
                    boxShadow: '0 8px 24px #00000099',
                  }}
                />
              </StyledAvatarWrap>
              <StyledUserName to="/user">{u.name}</StyledUserName>
              <StyledSubscribeButton variant="contained">Подписаться</StyledSubscribeButton>
            </StyledUserCard>
          </Grid>
        ))}
      </StyledUsersGrid>
    </>
  );
};
