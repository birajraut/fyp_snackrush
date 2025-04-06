import {
  RxBackpack,
  RxDashboard,
  RxLapTimer,
  RxListBullet,
  RxMagicWand,
  RxPerson,
} from 'react-icons/rx';

export const mainMenu = [
  {
    link: '/',
    title: 'Home',
  },
  {
    link: '/restaurants',
    title: 'Restaurants',
  },
  {
    link: '/blog',
    title: 'Blogs',
  },
  {
    link: '/aboutUs',
    title: 'About',
  },
];

export const mainMenuRestaurantManager = [
  {
    link: '/',
    title: 'Home',
  },
  {
    link: '/blog',
    title: 'Blogs',
  },
  {
    link: '/aboutUs',
    title: 'About',
  },
];

export const restaurantMenu = [
  {
    link: '/',
    title: 'Dashboard',
    icon: <RxDashboard />,
  },

  {
    link: '/items',
    title: 'Items',
    icon: <RxListBullet />,
  },

  {
    link: '/orders',
    title: 'Orders',
    icon: <RxMagicWand />,
  },

  //   {
  //     link: '/delevaries',
  //     title: 'Delevaries',
  //     icon: <RxLapTimer />,
  //   },
  {
    link: '/teams',
    title: 'Teams',
    icon: <RxPerson />,
  },
  //   {
  //     link: '/revenue',
  //     title: 'Revenue',
  //     icon: <RxBackpack />,
  //   },
];



export const adminMenu = [
  {
    link: '/',
    title: 'Dashboard',
    icon: <RxDashboard />,
  },

  {
    link: '/restaurants',
    title: 'Restaurants',
    icon: <RxListBullet />,
  },

  {
    link: '/users',
    title: 'Users',
    icon: <RxPerson />,
  },

  //   {
  //     link: '/delevaries',
  //     title: 'Delevaries',
  //     icon: <RxLapTimer />,
  //   },
  // {
  //   link: '/teams',
  //   title: 'Teams',
  //   icon: <RxPerson />,
  // },
  //   {
  //     link: '/revenue',
  //     title: 'Revenue',
  //     icon: <RxBackpack />,
  //   },
];
