// components
import { CardDrawer } from '../cardDrawer/CardDrawer';
// mui
import { Box, Button } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
// hooks
import { useDrawer } from '../../context/DrawerContext';
// types
import { CardDrawerType } from '../../types/share';
// styles
import { StyledSidebar, StyledSidebarList, StyledSidebarListItem } from '../StylesComponents';

export const Sidebar = () => {
  const { setOpen } = useDrawer();
  const drawerCardData: CardDrawerType[] = [
    {
      avatar: './img/users/user-01.jpg',
      views: '1.4 тыс.',
      title: 'Новые айфоны - Смотреть',
      author: 'bratis',
      category: 'Dota 2',
      href: '/qqqqwwww',
    },
    {
      avatar: './img/users/user-02.jpg',
      views: '2.1 тыс.',
      title: 'Обзор PS5',
      author: 'gamerX',
      category: 'PlayStation',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-03.jpg',
      views: '3.2 тыс.',
      title: 'Летсплей Cyberpunk 2077',
      author: 'neo',
      category: 'RPG',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-04.jpg',
      views: '980',
      title: 'Лучшие мемы недели',
      author: 'funnyGuy',
      category: 'Comedy',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-05.jpg',
      views: '5.6 тыс.',
      title: 'Топ-10 стратегий',
      author: 'strategist',
      category: 'Games',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-06.jpg',
      views: '1.1 тыс.',
      title: 'Гайды по Minecraft',
      author: 'blockBuilder',
      category: 'Minecraft',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-07.jpg',
      views: '2.5 тыс.',
      title: 'Новые возможности AI',
      author: 'techGuru',
      category: 'Tech',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-08.jpg',
      views: '750',
      title: 'Приготовление пиццы дома',
      author: 'chef123',
      category: 'Cooking',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-09.jpg',
      views: '1.8 тыс.',
      title: 'Тренировка в зале',
      author: 'fitLife',
      category: 'Fitness',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-10.jpg',
      views: '4.0 тыс.',
      title: 'Обзор фильмов 2025',
      author: 'movieBuff',
      category: 'Movies',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-11.jpg',
      views: '3.3 тыс.',
      title: 'Советы по фотосъёмке',
      author: 'photoPro',
      category: 'Photography',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-12.jpg',
      views: '1.2 тыс.',
      title: 'Путешествие в Японию',
      author: 'traveler',
      category: 'Travel',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-13.jpg',
      views: '2.8 тыс.',
      title: 'DIY домашний декор',
      author: 'crafty',
      category: 'DIY',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-14.jpg',
      views: '950',
      title: 'Музыкальный кавер',
      author: 'singer',
      category: 'Music',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-15.jpg',
      views: '1.5 тыс.',
      title: 'Обучение React',
      author: 'devMaster',
      category: 'Programming',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-16.jpg',
      views: '2.2 тыс.',
      title: 'Советы по стилю',
      author: 'fashionista',
      category: 'Fashion',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-17.jpg',
      views: '3.7 тыс.',
      title: 'Лучшие трюки на скейтборде',
      author: 'skater',
      category: 'Sports',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-18.jpg',
      views: '1.0 тыс.',
      title: 'Интересные факты о космосе',
      author: 'astro',
      category: 'Science',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-19.jpg',
      views: '2.4 тыс.',
      title: 'Обзор книг',
      author: 'bookworm',
      category: 'Books',
      href: '/qqqqww',
    },
    {
      avatar: './img/users/user-20.jpg',
      views: '1.9 тыс.',
      title: 'Как играть в шахматы',
      author: 'chessMaster',
      category: 'Games',
      href: '/qqqqww',
    },
  ];

  return (
    <StyledSidebar style={{ width: 'auto', padding: '9px 5px 0' }}>
      <Box>
        <Button onClick={() => setOpen(true)}>
          <FirstPageIcon
            fontSize="large"
            sx={{ color: 'var(--white)', minWidth: 'auto', transform: 'rotate(-180deg)' }}
          />
        </Button>
      </Box>
      {drawerCardData && (
        <StyledSidebarList sx={{ height: '100%', overflowX: 'hidden', flex: 1 }}>
          {drawerCardData.map((card, i) => (
            <StyledSidebarListItem key={i}>
              <CardDrawer card={card} variant="compact" />
            </StyledSidebarListItem>
          ))}
        </StyledSidebarList>
      )}
    </StyledSidebar>
  );
};
