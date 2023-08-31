import React, { useState } from 'react'
import './ShopReg.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
export default function ShopReg() {
    const [user, setuser] = useState({
        fname: '',
        lname: '',
        uname: '',
        pass: '',
        email: '',
        add:''
    })

    const handleChange = (e) => {
        setuser({
            ...user, [e.target.name]: e.target.value
        })
        // console.log(user);
    }


    const handleSubmit = (e) => {
        let firstName = user.fname
        let lastName = user.lname
        let userName = user.uname
        let email = user.email
        let password = user.pass
        let address = user.add
        e.preventDefault()
        axios.post("https://apnidukan-vn2v.onrender.com/signup", { firstName,lastName,userName,password,email,address})
            .then(res => console.log(res))
            .then(res => alert("Registration is done successfully now u can proceed further to login",res))
            .catch(err => console.log("kuch gadbad hai"+err))
    }


    return (
        <>
            <div>
                <div className="nav">
                    <ul>
                        <li><NavLink to="/">Customer Login</NavLink></li>
                        <li><NavLink to="/shoplogin">Shopkeeper Login</NavLink></li>
                    </ul>
                </div>
            </div>
            <div className="form-ly">
                <section className="container">
                    <header>ShopKeeper Registration</header>
                    <form action="#" className="form">
                        <div className="column">
                            <div className="input-box">
                                <label>Fisrt name</label>
                                <input type="text" name="fname" value={user.fname} onChange={handleChange} placeholder="Enter First Name" required />
                            </div>

                            <div className="input-box">
                                <label>Last name</label>
                                <input type="text" name='lname' value={user.lname} onChange={handleChange} placeholder="Enter Last Name" required />
                            </div>
                        </div>
                        <div className="column">
                            <div className="input-box">
                                <label>Username</label>
                                <input type="text" name='uname' value={user.uname} onChange={handleChange} placeholder="Enter Username" required />
                            </div>

                            <div className="input-box">
                                <label>Password</label>
                                <input type="password" name='pass' value={user.pass} onChange={handleChange} placeholder="Enter Password" required />
                            </div>
                        </div>
                        <div className="input-box">
                            <label>Email</label>
                            <input type="text" name='email' value={user.email} onChange={handleChange} placeholder="Enter Email" required />
                        </div>

                        <div className="input-box">
                            <label>Address</label>
                            <input type="text" name='add' value={user.add} onChange={handleChange} placeholder="Enter Address" required />
                        </div>

                        <div className="input-box">
                            <button onClick={handleSubmit}>Register</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}
