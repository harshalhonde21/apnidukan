import React, { useEffect } from 'react'
import './Dash.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import Dash from './Dash';
import Register from './Register';
import Sales from './Sales';
import Item from './Item';
import Receipt from './Receipt';
import ManageAcc from './ManageAcc';
import ReceiptShow from './ReceiptShow'

import ItemList from './ItemList';
import Advertisment from './Advertisment';
import axios from 'axios';

import { useNavigate } from "react-router-dom";
export default function NavDash() {
    const [hidden, sethide] = useState('none');
    const hide = () => {
        if (hidden === 'none') {
            sethide('');
        }
        else {
            sethide('none');
        }
    }

    const shoplog = () => {
        const sl = localStorage.getItem("data")
        return JSON.parse(sl)
    }
    const [user, setuser] = useState(shoplog)

    const navigate = useNavigate()
    const toshoplog= ()=>{
        navigate('/')
    }

    const [shop, setShop] = useState([])
    const d = async () => {
        try {
            const res = await axios.get("http://localhost:5500/")
            return res.data.Shopkeepers
        } catch (err) {
            console.log("error")
        }
    }
    useEffect(() => {
        const getdata = async () => {
            const alldata = await d()
            if (alldata) setShop((alldata))
        }
        getdata()
    }, [])

    const logout=()=>{
        localStorage.removeItem("data")
        toshoplog()
    }


    return (
        <>
            <div className="head">
                <div className="shopinfo">
                    <div className="ham">
                        <button className="btndash" onClick={hide}>
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>
                    <div className="txt" style={{fontSize:"0.8rem"}}>
                        <h2>{user.email}</h2>
                        <p>Book From : 1-04-2023 to 31-03-2024</p>
                    </div>
                </div>
                <div className="sideopt">
                    {
                        shop.map((data) => {
                            const { _id, userName, email } = data
                            if (email === user.email) {
                                return (
                                    <div className="txt" key={_id} style={{fontSize:"0.9rem"}}>
                                        <h2>{userName}</h2>
                                        <p>Shopkeeper id : {_id}</p>
                                    </div>
                                )
                            }
                        })
                    }
                    <button className="btndash" onClick={logout}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                </div>
            </div>
            <div className="main">
                <h1>
                    Shopkeeper Dashboard
                </h1>
                <div className="customersec">
                    <div className="sidemenu" style={{ display: `${hidden}` }}>
                        <div className="managecustomer">
                            <Link to='/navdash'><btn className="btn"><h2 style={{ textAlign: "center" }}>DashBoard</h2></btn></Link>
                        </div>
                        <div className="managecustomer">
                            <h2>Manage Customer</h2>
                            <hr />
                            <Link to='/navdash/addcus'><div className="btn"><i className="fa-solid fa-plus"></i> Add Account</div></Link>
                        </div>
                        <div className="managecustomer">
                            <h2>Accounts</h2>
                            <hr />
                            <Link to='/navdash/sales'><div className="btn"><i className="fa-solid fa-money-bill"></i> Sales</div></Link>
                        </div>
                        <div className="managecustomer">
                            <h2>Products</h2>
                            <hr />
                            <Link to='/navdash/item'><div className="btn"><i className="fa-solid fa-money-bill"></i> Item</div></Link>
                        </div>
                        <div className="managecustomer">
                            <h2>Reciept</h2>
                            <hr />
                            <Link to='/navdash/receipt'><div className="btn">Reciept</div></Link>
                            <Link to='/navdash/showreceipt'><div className="btn">All Receipt</div></Link>
                        </div>
                        <div className="managecustomer">
                            <h2>Report</h2>
                            <hr />
                            <Link to='/navdash/mangcus'><div className="btn"><i className="fa-solid fa-bars-progress"></i> Account Master</div></Link>
                            <Link to='/navdash/mst'><div className="btn">Inv. Master</div></Link>
                        </div>
                        
                        <div className="managecustomer">
                            <h2>Other</h2>
                            <hr />
                            <Link to='/navdash/advertisment'><div className="btn">Advertisment</div></Link>
                        </div>
                    </div>
                    <div className="dashmenu">
                        <div className="dashcont">
                            <Routes>
                                <Route path='/'>
                                    <Route index element={<Dash />} />
                                    <Route path='/addcus' element={<Register />} />
                                    <Route path='/sales' element={<Sales />} />
                                    <Route path='/item' element={<Item />} />
                                    <Route path='/receipt' element={<Receipt />} />
                                    <Route path='/mangcus' element={<ManageAcc />} />
                                    <Route path='/mst' element={<ItemList />} />
                                    <Route path='/advertisment' element={<Advertisment/>} />
                                    <Route path='/showreceipt' element={<ReceiptShow/>} />
                                </Route>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
