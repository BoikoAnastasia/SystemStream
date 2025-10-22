import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routers } from './routers/routers';
import { NotFound } from './pages/NotFound/NotFound';
import './index.css';
import { Providers } from './Providers';
import { Loader } from './components/ui/loader/Loader';

function App() {
  return (
    <Providers>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/*<Route element={<PrivateRoute/>}>*/}
          {/*    {privateRouters.map(({path, Element}) => (*/}
          {/*        <Route key={path} element={<Element/>} />*/}
          {/*    ))}*/}
          {/*</Route>*/}
          {routers.map(({ path, Element, ...props }) => (
            <Route key={path} path={path} element={<Element {...props} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Providers>
  );
}

const Loading = () => {
  return <Loader />;
};

export default App;
