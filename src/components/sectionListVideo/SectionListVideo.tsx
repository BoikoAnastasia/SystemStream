// components
import { VideoView } from '../videoView/VideoView';
// styles
import { StyledVideoGrid } from '../StylesComponents';
// types
import { IStreamOnline } from '../../types/share';

export const SectionListVideo = ({ list }: { list: IStreamOnline[] }) => {
  return (
    <StyledVideoGrid>
      {(list ?? []).map((item) => (
        <VideoView item={item} key={item.streamId} />
      ))}
    </StyledVideoGrid>
  );
};
