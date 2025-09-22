import { FC, JSX } from 'react';
import { appLayout } from '../../layout/index';
import { TabsComponent } from '../../components/ui/tabs/TabsComponent';
import { UserHeader } from './components/userHeader/UserHeader';
import { UserAbout } from './components/userAbout/UserAbout';

// TODO Тут надо добавить, если у человека планируется стрим, то покаывать (трансляция еще не началась)
// TODO Тут надо добавить, если у человека идет стрим, то покаывать стрим
export const UserPage: FC = appLayout((): JSX.Element => {
  // const [status, setStatus] = useState(false)

  return (
    <div className="page container__main">
      <UserHeader />
      <TabsComponent propTabsTitle={['Обо мне', 'Расписание', 'Видео', 'Клипы']} propsChild={[<UserAbout />]} />
    </div>
  );
});
