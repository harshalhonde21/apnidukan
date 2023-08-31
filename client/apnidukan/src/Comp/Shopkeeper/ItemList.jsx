import React from 'react'
import './Dash.css'
import { useState, useEffect } from 'react';
export default function ItemList() {

    const getitem = (value) => {
        const gi = localStorage.getItem('item')
        if (gi) {
            return JSON.parse(gi)
        }
        else {
            return []
        }
    }

    const [item, setItem] = useState(getitem)
    const [key,setKey] = useState(null)
    return (
        <>
            <div className="itemtable" >
                <h2>Item Table</h2>
                <div className="searchbox" style={{textAlign:"right"}}>
                    <input type="text" name="" id="" onChange={(e)=>{setKey(e.target.value)}} placeholder='Search' style={{border:"1px solid black",padding:"0.51rem 0.5rem",margin:"1rem"}}/>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Unit</th>                           
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            item
                            .filter((data)=>{
                                if(key===null){return data}
                                else if(data.product.toLowerCase().includes(key.toLowerCase())){return data}
                            })
                            .map((data) => {
                                return (
                                    <tr key={data.product}>
                                        <td>{data.product}</td>
                                        <td>{data.unit}</td>
                                        <td>{data.cost}</td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
