import React, { useState } from "react";
// import './index1.css';
import { Link } from "react-router-dom";
import './Dash.css';
// import './CusReg.css';
import axios from 'axios'


export default function Register(props) {
    const [user, setuser] = useState({})

    const handleChange = (e) => {
        setuser({
            ...user, [e.target.name]: e.target.value
        })
        // console.log(user)
    }




    const handleSubmit = (e) => {
        let shopkeeperId = user.shopkeeperId
        let firstName = user.fname
        let lastName = user.lname
        let email = user.email
        let number = user.num
        e.preventDefault();
        console.log(user);
        const log = async () => {
            try {
                const res = await axios.post('https://apnidukan-vn2v.onrender.com/cussignup', { shopkeeperId, firstName, lastName, email, number })
                if (res) {
                    console.log("Connected")
                    alert(res.data.message)
                    console.log(res)
                    // alert(res.data)
                }
            }
            catch (error) {
                console.log("nahi ho raha \n" + error)
            }
        }
        log()
    }
    return (
        < div className="form-ly" >
            <section className="container">
                <header>Customer Registration</header>
                <form action="#" className="form">
                    <div className="input-box">
                        <label>Shopkeeper ID</label>
                        <input type="text" name='shopkeeperId' value={user.shopkeeperId} onChange={handleChange} placeholder="Enter Shopkeeper ID" required />
                    </div>
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
                    <div className="input-box">
                        <label>Email</label>
                        <input type="text" name='email' value={user.email} onChange={handleChange} placeholder="Enter Email" required />
                    </div>
                    <div className="input-box">
                        <label>Phone No.</label>
                        <input type="Number" name='num' value={user.num} onChange={handleChange} placeholder="Enter number" required />
                    </div>
                    <div className="input-box">
                        <button onClick={handleSubmit}>Register</button>
                    </div>
                </form>
            </section>
        </div >
    )
}












