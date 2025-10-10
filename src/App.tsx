import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routers } from './routers/routers';
import { StyledloadingCircle } from './components/StylesComponents';
import { NotFound } from './pages/NotFound/NotFound';
import './index.css';

function App() {
  return (
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
  );
}

const Loading = () => {
  return <StyledloadingCircle></StyledloadingCircle>;
};

export default App;
