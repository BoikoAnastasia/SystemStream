// components
import { VideoCard } from '../../../../components/videoCard/VideoCard';
// styles
import {
  ContainerProfileComponents,
  StyledAboutSection,
  StyledNameComponents,
  StyledTitleModal,
  StyledVideoGrid,
  StyledVideoSection,
} from '../../../../components/StylesComponents';
// types
import { IProfile } from '../../../../types/share';

export const UserAbout = ({ userData }: { userData: IProfile | null }) => {
  return (
    <ContainerProfileComponents>
      <StyledAboutSection>
        <StyledTitleModal>ОБО МНЕ</StyledTitleModal>
        <StyledNameComponents sx={{ padding: '0 20px' }}>
          {userData?.profileDescription || 'Скоро информация обо мне появится здесь! '}
        </StyledNameComponents>
      </StyledAboutSection>
      <StyledVideoSection>
        <StyledTitleModal>ПОСЛЕДНИЕ СТРИМЫ</StyledTitleModal>
        <StyledVideoGrid>
          {[1, 2, 3, 4, 5].map((i) => (
            <VideoCard key={i} index={i} />
          ))}
        </StyledVideoGrid>
      </StyledVideoSection>
    </ContainerProfileComponents>
  );
};
