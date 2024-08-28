import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import HomePageController from "./components/homepage/HomePageController";
import AlbumPageController from "./components/albums/AlbumPageController";
import RegisterPage from "./components/user/RegisterPage";
import Header from "./components/header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./components/user/LoginPage";
import ProfilePage from "./components/user/ProfilePage";
import ProtectedRoute from "./components/routing/ProtectedRoutes";
import ProfilePageController from "./components/profile/ProfilePageController";

const App = () => {
  return (<>
    <Router>
      <Header />
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<HomePageController />} />
          <Route path='/profile' element={<ProfilePageController />} />
          <Route path='/albums' element={<AlbumPageController />} />
        </Route>
      </Routes>
    </Router>
  </>);
};

export default App;