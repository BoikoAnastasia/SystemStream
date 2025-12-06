import { Loader } from '../ui/loader/Loader';
import { EmptyBlock, ErrorBlock } from '../helperBlock/HelperBlock';

interface IContentWrapperSwitchProps {
  isLoading: boolean;
  isError: string | boolean | null;
  data: any[];
  children: React.ReactNode;
  onRetry: () => void;
  text: string;
}

export const ContentWrapperSwitch = ({
  isLoading,
  isError,
  data,
  children,
  onRetry,
  text,
}: IContentWrapperSwitchProps) => {
  if (isLoading) return <Loader />;

  if (isError) return <ErrorBlock error={isError} onRetry={onRetry} />;

  if (!data || data.length === 0) {
    return <EmptyBlock text={text} />;
  }
  return <>{children}</>;
};
