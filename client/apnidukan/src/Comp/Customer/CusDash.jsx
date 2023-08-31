import React from 'react'
import './Dash.css';
// import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function CusDash() {
    const [hidden, sethide] = useState('');
    const hide = () => {
        if (hidden === 'none') {
            sethide('');
        }
        else {
            sethide('none');
        }
    }
    return (
        <div>
            <div className="head">
                <div className="shopinfo">
                    <div className="ham">
                        <button className='toggle' onClick={hide}>
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>
                    <div className="txt">
                        <h2>Customer name</h2>
                        <p>Customer Id:</p>
                    </div>
                </div>
                <div className="acc">
                    <i className="fa-regular fa-user"></i>
                </div>
            </div>
            <div className="main">
                <h1>
                    Customer Dashboard
                </h1>
                <div className="customersec">
                    <div className="sidemenu" style={{ display: `${hidden}` }}>
                        <div className="managecustomer">
                            <h2>Credits</h2>
                            <hr />
                            <div className="btn"><i className="fa-solid fa-receipt"></i>  Balance Credit</div>
                        </div>
                        <div className="managecustomer">
                            <h2>Alerts</h2>
                            <hr />
                            <div className="btn"><i className="fa-regular fa-bell"></i>  Alerts and Notification</div>
                        </div>
                        <div className="managecustomer">
                            <h2>Offers</h2>
                            <hr />
                            <div className="btn"><i className="fa-brands fa-adversal"></i>  Offers and Advertistment</div>
                        </div>
                    </div>
                    <div className="dashmenu" style={{padding:"2rem 0"}}>
                        <div className="wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Bill No</th>
                                        <th>Date</th>
                                        <th>Due Date</th>
                                        <th>Invoice Amount</th>
                                        <th>Balance Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
