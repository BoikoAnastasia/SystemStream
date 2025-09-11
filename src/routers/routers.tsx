import { lazy } from 'react';

// const Error = lazy(() =>
//     import ('../pages/ErrorPage/Error').then(({Error}) => ({
//         default: Error,
//     })),
// );

const MainPage = lazy(() =>
  import('../pages/mainPage/MainPage').then(({ MainPage }) => ({
    default: MainPage,
  }))
);

// const ShopPage = lazy(() =>
//     import ('../pages/ShopPage/ShopPage').then(({ShopPage}) => ({
//         default: ShopPage,
//     })),
// );

// const SingleProductPage = lazy(() =>
//     import ('../pages/SingleProductPage/SingleProductPage').then(({SingleProductPage}) => ({
//         default: SingleProductPage,
//     })),
// );

// const CartPage = lazy(() =>
//     import ('../pages/CartPage/CartPage').then(({CartPage}) => ({
//         default: CartPage,
//     })),
// );
// const Authorization = lazy(() =>
//     import ('../pages/Authorization/Authorization').then(({Authorization}) => ({
//         default: Authorization,
//     })),
// );

export const routers = [
  { path: '/', Element: MainPage },
  // {path: '/error', Element: Error},
  // {path: '/shop', Element: ShopPage},
  // {path: '/product/:id', Element: SingleProductPage},
  // {path: '/cart', Element: CartPage},
  // {path: '/authorization', Element: Authorization}
];
