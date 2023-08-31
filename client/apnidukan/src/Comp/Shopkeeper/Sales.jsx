import { useEffect, useState } from "react";
import "./Dash.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function Sales() {
  const getitem = () => {
    const gi = localStorage.getItem("item");
    if (gi) {
      return JSON.parse(gi);
    } else {
      return [];
    }
  };

  const [item, setItem] = useState(getitem);
  const [key, setKey] = useState(null);
  const [product, setProduct] = useState();
  const [unit, setUnit] = useState();
  const [mrp, setMrp] = useState();
  const [cost, setCost] = useState();
  const [cusitem, setCusitem] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [billNo, setBillNo] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [qty, setQty] = useState();

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("https://apnidukan-vn2v.onrender.com/getcus");
        setCustomers(res.data.customer);
      } catch (err) {
        console.log("Error fetching customers:", err);
      }
    };
    fetchCustomers();
  }, []);

  const [tots, settot] = useState(0);
  let t = 0;

  const handleadd = (list) => {
    setCusitem([...cusitem, list]);
    let amt = parseInt(list.qty) * parseInt(list.cost);
    let t = parseInt(tots) + parseInt(amt);
    settot(t);
  };

  const handleDeleteItem = (index) => {
    const filteredCusItems = [...cusitem];
    filteredCusItems.splice(index, 1);
    setCusitem(filteredCusItems);
  };

  const handleCustomerSelect = async (e) => {
    const selectedCustomerId = e.target.value;
    setSelectedCustomer(selectedCustomerId);

    try {
      const res = await axios.get(
        `https://apnidukan-vn2v.onrender.com/getcus/${selectedCustomerId}`
      );
      setPhoneNumber(res.data.customer.number);
    } catch (err) {
      console.log("Error fetching phone number:", err);
    }
  };

  const handleBillNoChange = (e) => {
    setBillNo(e.target.value);
  };

  useEffect(() => {
    const calculateTotalAmount = () => {
      let total = 0;
      for (const item of cusitem) {
        total += parseInt(item.qty) * parseInt(item.cost);
      }
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [cusitem]);

  const handleqty = (e) => {
    setQty(e.target.value);
  };

  const handleSubmitBill = async () => {
    const billData = {
      billNo,
      CustomerID: selectedCustomer,
      date: new Date(),
      mobileNo: phoneNumber,
      cusitem,
      tots,
    };

    console.log(billData);
    try {
      const response = await axios.post(
        "https://apnidukan-vn2v.onrender.com/api/bills/createBill",
        billData
      );
      alert(response.data.message);



      const receiptData = {
        phoneNumber, 
        cusitem,
        tots,
        billNo,
        selectedCustomer,
      };

      navigate("/receipt", { state: receiptData });
      
    } catch (error) {
      console.error("Error creating bill:" + error);
    }
  };

  return (
    <>
      <div className="saleform">
        <form>
          <h2>Customer Credential</h2>
          <div className="row">
            <div className="col">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label text-white"
              >
                Bill No:
              </label>
              <input
                style={{ margin: "1rem 1rem" }}
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                value={billNo}
                onChange={handleBillNoChange}
              />
            </div>
            <div className="col">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label text-white"
              >
                Customer Name:
              </label>
              <select
                style={{ margin: "1rem 1rem" }}
                className="form-control"
                value={selectedCustomer}
                onChange={handleCustomerSelect}
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {`${customer.firstName} ${customer.lastName}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label text-white"
              >
                Date:
              </label>
              <input
                style={{ margin: "1rem 1rem" }}
                type="date"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>

            <div className="col">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label text-white"
              >
                Mobile No:
              </label>
              <input
                style={{ margin: "1rem 1rem" }}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={phoneNumber}
                readOnly
              />
            </div>
          </div>
        </form>
      </div>

      <div className="itemtable">
        <h2>Item Table</h2>
        <div className="searchbox" style={{ textAlign: "right" }}>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => {
              setKey(e.target.value);
            }}
            placeholder="Search"
            style={{
              border: "1px solid black",
              padding: "0.51rem 0.5rem",
              margin: "1rem",
            }}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {item
              .filter((data) => {
                if (key === null) {
                  return null;
                } else if (
                  data.product.toLowerCase().includes(key.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((data) => {
                const { product, cost } = data;
                return (
                  <tr key={data.product}>
                    <td>{data.product}</td>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        onChange={handleqty}
                        value={qty}
                        style={{ width: "5rem", border: "1px solid black" }}
                      />
                    </td>
                    <td>{data.cost}</td>
                    <td>
                      <button
                        style={{ padding: "0.2rem 0.6rem", margin: "0" }}
                        onClick={() => {
                          let list = { product, qty, cost };
                          handleadd(list, qty, cost);
                        }}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="itemtable">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Unit</th>
              <th>Cost</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cusitem.map((data, index) => {
              const { product, qty, cost } = data;
              let amt = parseInt(qty) * parseInt(data.cost);
              return (
                <tr key={product}>
                  <td>{product}</td>
                  <td>{qty}</td>
                  <td>{cost}</td>
                  <td>{amt}</td>
                  <td>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => handleDeleteItem(index)}
                      style={{
                        color: "black",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                      }}
                    ></i>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="3" style={{ textAlign: "right" }}>
                Total Amount:
              </td>
              <td>{tots}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={handleSubmitBill}
        style={{ border: "1px solid black", boxShadow: "2px 2px 10px black" }}
      >
        Submit Bill
      </button>
    </>
  );
}
