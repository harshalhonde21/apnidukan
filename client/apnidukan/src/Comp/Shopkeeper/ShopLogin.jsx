import React, { useEffect, useState } from "react";
import './index1.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { NavLink, Link } from "react-router-dom";
// import useHistory from 'react-router-dom'

export default function ShopLogin() {
    const navigate = useNavigate();

    const tolog = () =>{
        const sl = localStorage.getItem("data")
        if(sl){return JSON.parse(sl)}
        else return []
    }

    const [user, setuser] = useState(tolog)


    const toShopreg = () => {
        navigate('/shopreg')
    }
    const handleChange = (e) => {
        setuser({
            ...user, [e.target.name]: e.target.value
        })
        console.log(user);
    }

    const toDash = () => {
        navigate('/navdash')
    }
    const toshoplog=()=>{
        navigate('/shoplogin')
    }
    const handleSubmit = (e) => {
        toshoplog()
        e.preventDefault();
        let email = user.email
        let password =user.password
        const log = async () => {
            try {
                const res = await axios.post('http://localhost:5500/login', {email,password})
                alert(res.data.message)
                console.log(res.data.message)
                let msg = res.data.message
                if(msg === "login successfull"){
                    toDash()
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        log()
    }
    useEffect(()=>{
        localStorage.setItem("data",JSON.stringify(user))
    },[user])
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
            <div className="auth-form-container">
                <h2>Shopkeeper Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input value={user.email} onChange={handleChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="password">Password</label>
                    <input value={user.password} onChange={handleChange} type="password" placeholder="********" id="password" name="password" />
                    <button type="submit" onClick={handleSubmit}>Log In</button>
                </form>
                <button className="link-btn" onClick={toShopreg}>Don't have an account? Register here.</button>
            </div>
        </>
    )
}
