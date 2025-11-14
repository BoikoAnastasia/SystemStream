// components
import { Logo } from '../logo/Logo';
import { useDrawer } from '../../context/DrawerContext';
import { CardDrawer } from '../cardDrawer/CardDrawer';
// mui
import { Box, SvgIconTypeMap } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { OverridableComponent } from '@mui/material/OverridableComponent';
// styles
import {
  StyledDrawer,
  StyledSidebarLink,
  StyledSidebarList,
  StyledSidebarListItem,
  StyledSidebarName,
} from '../StylesComponents';
// types
import { CardDrawerType } from '../../types/share';

interface IButtonInfo {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  value: string;
  href: string;
}

export const DrawerComponent = () => {
  const { open, setOpen } = useDrawer();
  const buttonInfo: IButtonInfo[] = [
    {
      icon: HomeIcon,
      value: 'Главная',
      href: '/',
    },
    {
      icon: HistoryIcon,
      value: 'История',
      href: '#',
    },
    {
      icon: SportsEsportsIcon,
      value: 'Категории',
      href: '#',
    },
  ];
  const drawerCardData: CardDrawerType[] = [
    {
      avatar: './img/users/user-01.jpg',
      views: '1.4 тыс.',
      title: 'Новые айфоны - Смотреть',
      author: 'bratis',
      category: 'Dota 2',
    },
    {
      avatar: './img/users/user-02.jpg',
      views: '2.1 тыс.',
      title: 'Обзор PS5',
      author: 'gamerX',
      category: 'PlayStation',
    },
    {
      avatar: './img/users/user-03.jpg',
      views: '3.2 тыс.',
      title: 'Летсплей Cyberpunk 2077',
      author: 'neo',
      category: 'RPG',
    },
    {
      avatar: './img/users/user-04.jpg',
      views: '980',
      title: 'Лучшие мемы недели',
      author: 'funnyGuy',
      category: 'Comedy',
    },
    {
      avatar: './img/users/user-05.jpg',
      views: '5.6 тыс.',
      title: 'Топ-10 стратегий',
      author: 'strategist',
      category: 'Games',
    },
    {
      avatar: './img/users/user-06.jpg',
      views: '1.1 тыс.',
      title: 'Гайды по Minecraft',
      author: 'blockBuilder',
      category: 'Minecraft',
    },
    {
      avatar: './img/users/user-07.jpg',
      views: '2.5 тыс.',
      title: 'Новые возможности AI',
      author: 'techGuru',
      category: 'Tech',
    },
    {
      avatar: './img/users/user-08.jpg',
      views: '750',
      title: 'Приготовление пиццы дома',
      author: 'chef123',
      category: 'Cooking',
    },
    {
      avatar: './img/users/user-09.jpg',
      views: '1.8 тыс.',
      title: 'Тренировка в зале',
      author: 'fitLife',
      category: 'Fitness',
    },
    {
      avatar: './img/users/user-10.jpg',
      views: '4.0 тыс.',
      title: 'Обзор фильмов 2025',
      author: 'movieBuff',
      category: 'Movies',
    },
    {
      avatar: './img/users/user-11.jpg',
      views: '3.3 тыс.',
      title: 'Советы по фотосъёмке',
      author: 'photoPro',
      category: 'Photography',
    },
    {
      avatar: './img/users/user-12.jpg',
      views: '1.2 тыс.',
      title: 'Путешествие в Японию',
      author: 'traveler',
      category: 'Travel',
    },
    {
      avatar: './img/users/user-13.jpg',
      views: '2.8 тыс.',
      title: 'DIY домашний декор',
      author: 'crafty',
      category: 'DIY',
    },
    {
      avatar: './img/users/user-14.jpg',
      views: '950',
      title: 'Музыкальный кавер',
      author: 'singer',
      category: 'Music',
    },
    {
      avatar: './img/users/user-15.jpg',
      views: '1.5 тыс.',
      title: 'Обучение React',
      author: 'devMaster',
      category: 'Programming',
    },
    {
      avatar: './img/users/user-16.jpg',
      views: '2.2 тыс.',
      title: 'Советы по стилю',
      author: 'fashionista',
      category: 'Fashion',
    },
    {
      avatar: './img/users/user-17.jpg',
      views: '3.7 тыс.',
      title: 'Лучшие трюки на скейтборде',
      author: 'skater',
      category: 'Sports',
    },
    {
      avatar: './img/users/user-18.jpg',
      views: '1.0 тыс.',
      title: 'Интересные факты о космосе',
      author: 'astro',
      category: 'Science',
    },
    {
      avatar: './img/users/user-19.jpg',
      views: '2.4 тыс.',
      title: 'Обзор книг',
      author: 'bookworm',
      category: 'Books',
    },
    {
      avatar: './img/users/user-20.jpg',
      views: '1.9 тыс.',
      title: 'Как играть в шахматы',
      author: 'chessMaster',
      category: 'Games',
    },
  ];

  return (
    <StyledDrawer open={open} onClose={() => setOpen(false)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: '20px',
            marginBottom: '45px',
          }}
        >
          <Logo />
        </Box>
        <StyledSidebarName>Для вас</StyledSidebarName>
        <StyledSidebarList>
          {buttonInfo.map((btn: IButtonInfo, i) => (
            <StyledSidebarListItem key={i}>
              <StyledSidebarLink to={btn.href}>
                <btn.icon /> {btn.value}
              </StyledSidebarLink>
            </StyledSidebarListItem>
          ))}
        </StyledSidebarList>
        <StyledSidebarName>Сейчас в эфире</StyledSidebarName>
        {drawerCardData && (
          <StyledSidebarList sx={{ height: '100%', overflowX: 'hidden', flex: 1 }}>
            {drawerCardData.map((card) => (
              <StyledSidebarListItem>
                <CardDrawer card={card} />
              </StyledSidebarListItem>
            ))}
          </StyledSidebarList>
        )}
      </Box>
    </StyledDrawer>
  );
};
