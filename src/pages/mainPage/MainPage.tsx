import { FC, JSX } from 'react';
import { appLayout } from '../../layout/index';
import { SearchInput } from '../../components/ui/searchInput/SearchInput';
import { TabsComponent } from '../../components/ui/tabs/TabsComponent';

export const MainPage: FC = appLayout((): JSX.Element => {
  const arrTest = [1, 2, 3, 4, 5];
  return (
    <div className="page container__main">
      <SearchInput width={'100%'} height={'48px'} />
      <TabsComponent propsChild={arrTest} propTabsTitle={['Все', 'Live каналы', 'Видео', 'Клипы', 'Пользователи']} />
    </div>
  );
});
