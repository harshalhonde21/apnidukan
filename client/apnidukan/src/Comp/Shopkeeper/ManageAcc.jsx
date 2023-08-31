import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index1.css";

export default function ManageAcc() {
  const [data, setData] = useState([]);

  const fetchCustomerData = async () => {
    try {
      const res = await axios.get("http://localhost:5500/getcus");
      return res.data.customer;
    } catch (err) {
      console.log("Error fetching customer data");
      return [];
    }
  };

 
  useEffect(() => {
    const getdata = async () => {
      const alldata = await fetchCustomerData();
      if (alldata) setData(alldata);
    };
    getdata();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5500/deletcus/${id}`)
      .then((res) => {
        alert(res.data.message);
        setData((prevData) => prevData.filter((post) => post._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };



  return (
    <>
      <div className="manageacc">
        <table style={{ margin: "auto", textAlign: "center" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>ObID</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Number</th>
              {/* <th>Balance</th>  */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((post) => {
              const {
                _id,
                shopkeeperId,
                firstName,
                lastName,
                email,
                number,
                balance,
              } = post;
              if (post) {
                return (
                  <tr className="container" key={_id}>
                    <td>{shopkeeperId}</td>
                    <td>{_id}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
                    <td>{number}</td>
                    {/* <td>{balance}</td>  */}
                    <td>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => handleDelete(_id)}
                        style={{ color: "#ff0000", cursor: "pointer" }}
                      ></i>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
