import Home from './pages/home';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './ForgotPassword';
import Verify from './pages/Verify';
import NotFound from './Notfoundpage';
import Detail from './pages/[id]'

import 'react-toastify/dist/ReactToastify.css'

function App() {


  return (
    <BrowserRouter>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path='detail/:id' element={<Detail />} />
        <Route path='SignIn' element={<SignIn />} />
        <Route path='SignUp' element={<SignUp />} />
        <Route path='ForgotPassword' element={<ForgotPassword />} />
        <Route path='Verify' element={<Verify />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
