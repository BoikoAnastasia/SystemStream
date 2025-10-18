// components
import { VideoView } from '../videoView/VideoView';
// styles
import { StyledVideoGrid } from '../StylesComponents';
// types
import { IVideoItem } from '../../types/share';

export const SectionListVideo = ({ list }: { list: IVideoItem[] }) => {
  return (
    <StyledVideoGrid>
      {list.map((item) => (
        <VideoView item={item} key={item.id} />
      ))}
    </StyledVideoGrid>
  );
};
