import { useState } from 'react';
import './App.css';
import CusLogin from './Comp/Customer/CusLogin';
import ShopLogin from './Comp/Shopkeeper/ShopLogin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShopReg from './Comp/Shopkeeper/ShopReg';
import NavDash from './Comp/Shopkeeper/NavDash';
import CusDash from './Comp/Customer/CusDash';
import Receipt from './Comp/Shopkeeper/Receipt';
import Sales from './Comp/Shopkeeper/Sales';

function App() {
  const [count, setCount] = useState({});

  const shoplog = () => {
    const sl = localStorage.getItem('data');
    if (sl) {
      return JSON.parse(sl);
    } else return [];
  };

  const toCusDash = () => {
    const CD = localStorage.getItem('cusdata');
    return JSON.parse(CD);
  };

  const [user, setuser] = useState(shoplog());
  const [cus, setCus] = useState(toCusDash());

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<CusLogin />} />
          <Route
            path="/cusdash"
            element={cus && cus.number ? <CusDash /> : <CusLogin />}
          ></Route>
          <Route
            exact
            path="/navdash/*"
            element={
              user && user.password ? <NavDash /> : <ShopLogin setUser={setuser} />
            }
          ></Route>
          <Route path="/shoplogin" element={<ShopLogin setUser={setuser} />} />
          <Route path="/shopreg" element={<ShopReg />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/receipt" element={<Receipt />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
