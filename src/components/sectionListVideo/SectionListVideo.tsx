// components
import { VideoView } from '../videoView/VideoView';
// styles
import { StyledVideoGrid } from '../../pages/userPage/StyledUserPage';
// types
import { IStreamOnline } from '../../types/share';

export const SectionListVideo = ({ list }: { list: IStreamOnline[] }) => {
  return (
    <StyledVideoGrid>
      {(list ?? []).map((item) => (
        <VideoView item={item} key={item.streamId ?? item.nickname} />
      ))}
    </StyledVideoGrid>
  );
};
