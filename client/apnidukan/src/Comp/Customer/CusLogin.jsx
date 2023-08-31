import React, { useState } from "react";
import './index1.css';
import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
export default function CusLogin() {

    const toCusDash = ()=>{
        const CD =localStorage.getItem("cusdata")
        if(CD)return JSON.parse(CD)
        else return []
    }
    const [user,setUser]=useState(toCusDash)
    const navigate = useNavigate()
    const handleChange = (e) =>{
        setUser({
            ...user,[e.target.name]:[e.target.value]
        })
        console.log(user)
    }


    const toDash = () =>{
        navigate('/cusdash')
    }
    const tocuslog = () =>{
        navigate('/')
    }

    const handleSubmit = (e) => {
        tocuslog()
        e.preventDefault();
        let email = user.email
        let number = user.number
        const log = async() => {
            try {
                const res = await axios.post('https://apnidukan-vn2v.onrender.com/cuslogin', {email,number})
                alert(res.data.message)
                console.log(res.data.message)
                // console.log(user)
                if(res){
                    // props.setCus(user)
                }
                if(res.data.message === 'Customer login successful'){
                    toDash()     
                }
            }
            catch (err) {
                console.log("kuch gadbad hai\n"+err)
            }
        }
        log()
    }
    useEffect(()=>{
        localStorage.setItem("cusdata",JSON.stringify(user))
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
                <h2>Customer Login</h2>
                <form className="login-form">
                    <label htmlFor="email">Email</label>
                    <input value={user.email} onChange={handleChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="num">Phone No.</label>
                    <input value={user.number} onChange={handleChange} type="number" placeholder="Enter Phone no." id="num" name="number" />
                    <button  onClick={handleSubmit}>Log In</button>
                </form>
            </div>
        </>
    )
}
