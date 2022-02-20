import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewOrder from "./pages/NewOrder";
import PrivateRoute from "./components/PrivateRoute";
import Orders from "./pages/Orders";
import Order from "./pages/Order";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/new-order' element={<PrivateRoute/>}>
              <Route path='/new-order' element={<NewOrder/>}/>
            </Route>
            <Route path='/orders' element={<PrivateRoute/>}>
              <Route path='/orders' element={<Orders/>}/>
            </Route>
            <Route path='/order/:orderId' element={<PrivateRoute/>}>
              <Route path='/order/:orderId' element={<Order/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
