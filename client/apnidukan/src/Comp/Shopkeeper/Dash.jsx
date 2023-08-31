import React from 'react'
import './Dash.css';
import { useState } from 'react';


export default function Dash() {
    const [hidden, sethide] = useState('none');
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
            <div className="wrapper">
                <div className="cards" style={{ backgroundColor: "rgba(147, 255, 255, 0.886)" }}>
                    <h5>Sales</h5> <hr />
                    <h3>20000/-</h3>
                </div>
                <div className="cards" style={{ backgroundColor: "rgba(251, 179, 179, 0.719)" }}>
                    <h5>Credit</h5> <hr />
                    <h3>20000/-</h3>
                </div>
                <div className="cards" style={{ backgroundColor: "rgba(147, 255, 255, 0.886)" }}>
                    <h5>Sales</h5> <hr />
                    <h3>20000/-</h3>
                </div>
                <div className="cards" style={{ backgroundColor: "rgba(251, 179, 179, 0.719)" }}>
                    <h5>Credit</h5> <hr />
                    <h3>20000/-</h3>
                </div>
            </div>
        </div>
    )
}
