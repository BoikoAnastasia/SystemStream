import { JSX } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const appLayout = (PageComponent: () => JSX.Element, header = true, footer = true) => {
  return function WithPage({ ...props }) {
    return (
      <>
        {header && <Header />}
        <PageComponent {...props} />
        {footer && <Footer />}
      </>
    );
  };
};
