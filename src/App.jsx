// Root
import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// Constants
import { IS_LOGIN } from './constants/index';
// Components
import './App.css';
import Layout from './components/layout/index.jsx';
import Loading from './components/UI/Loading';
// Routes
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ReactPage = lazy(() => import('./pages/ReactPage/ReactPage.jsx'));
const SalesShopsPage = lazy(() =>
   import('./pages/SalesShopPage/SalesShopsPage.jsx')
);
const SalesShopPage = lazy(() =>
   import('./pages/SalesShopPage/SalesShopPage.jsx')
);
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.jsx'));
const NotFoundPage = lazy(() =>
   import('./pages/NotFoundPage/NotFoundPage.jsx')
);
function App() {
   const [isLogin, setIsLogin] = useState(localStorage.getItem(IS_LOGIN));
   return (
      <div>
         <Suspense
            fallback={<Loading heightStyle='100vh' classStyle='bg-primary' />}
         >
            <BrowserRouter>
               <ToastContainer />
               <Routes>
                  <Route
                     path='login'
                     element={<LoginPage setIsLogin={setIsLogin}></LoginPage>}
                  ></Route>
                  <Route element={<Layout />}>
                     <Route
                        index
                        element={
                           isLogin ? <HomePage /> : <Navigate to='login' />
                        }
                     ></Route>
                     <Route
                        path='react'
                        element={
                           isLogin ? <ReactPage /> : <Navigate to='login' />
                        }
                     ></Route>
                     <Route
                        path='sales'
                        element={
                           isLogin ? (
                              <SalesShopsPage />
                           ) : (
                              <Navigate to='login' />
                           )
                        }
                     ></Route>
                     <Route
                        path='sales/:pageId'
                        element={
                           isLogin ? <SalesShopPage /> : <Navigate to='login' />
                        }
                     ></Route>
                  </Route>
                  <Route path='*' element={<NotFoundPage />} />
               </Routes>
            </BrowserRouter>
         </Suspense>
      </div>
   );
}

export default App;
