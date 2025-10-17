import { FC, JSX } from 'react';
import { appLayout } from '../../layout/index';
// components
import { TabsComponent } from '../../components/ui/tabs/TabsComponent';
import { ContainerBox } from '../../components/StylesComponents';
import { UserAbout } from './components/userAbout/UserAbout';
// mui
import { Box } from '@mui/material';
import { UserSchedule } from './components/userSchedule/UserSchedule';

export const UserPage: FC = appLayout((): JSX.Element => {
  return (
    <ContainerBox>
      <TabsComponent
        propsChild={[<UserAbout />, <UserSchedule />, <Box />]}
        propTabsTitle={['Основная информация', 'Расписание стримов', 'Все стримы']}
      />
    </ContainerBox>
  );
});
