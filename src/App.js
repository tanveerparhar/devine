import Home from './components/home.component';
import NavigationBar from './components/navigation.component';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/signIn.component';
import ErrorPage from './components/error.component';
import Register from './components/register.component';
import Wines from './components/wines.component';
import AddWine from './components/addWine.component';

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<NavigationBar/>}
      // loader={rootLoader}
      // action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route index element={<Home/>} errorElement={<ErrorPage />}></Route>
      <Route path={"sign-in"} element={<SignIn/>} errorElement={<ErrorPage />}></Route>
      <Route path={"register"} element={<Register/>} errorElement={<ErrorPage />}></Route>
      <Route path={"wines"} element={<Wines/>}></Route>
      <Route path={"add-wine"} element={<AddWine/>}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="">
     <RouterProvider router={router} />
      {/* <Routes>
        <Route path={"/"} element={<NavigationBar/>} >
          <Route path={"home"} element={<Home/>}></Route>
          <Route path={"sign-in"} element={<SignIn/>}></Route>
        </Route>
      </Routes> */}
    </div>
  );
  
}

export default App;
