import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import HomePageController from "./components/HomePageController";
import UserPageController from "./components/user/UserPageController";
import AlbumPageController from "./components/albums/AlbumPageController";
import RegisterPage from "./components/user/RegisterPage";
import Header from "./components/header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./components/user/LoginPage";
import ProfilePage from "./components/user/ProfilePage";

const App = () => {
  return (<>
    <Router>
      <Header />
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<HomePageController />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/albums' element={<AlbumPageController />} />
      </Routes>
    </Router>
  </>);
};

export default App;