import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
// routers
import { PrivateRoute, privateRouters, routers } from './routers/routers';
// components
import { NotFound } from './pages/NotFound/NotFound';
import { Loader } from './components/ui/loader/Loader';
// hooks
import { useAuthRestore } from './hooks/useAuthRestore';
// styles
import './index.css';

function App() {
  const { isLoading } = useAuthRestore();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<PrivateRoute />}>
          {privateRouters.map(({ path, Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
        </Route>
        {routers.map(({ path, Element, ...props }) => (
          <Route key={path} path={path} element={<Element {...props} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

const Loading = () => {
  return <Loader />;
};

export default App;
