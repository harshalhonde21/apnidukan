import React, { useState, useEffect } from 'react';

const ReceiptShow = () => {
  const [receiptData, setReceiptData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [matchingReceipt, setMatchingReceipt] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5500/api/receipt')
      .then(response => response.json())
      .then(data => {
        setReceiptData(data);
        const matching = data.find(item => item.phoneNumber.includes(searchInput));
        setMatchingReceipt(matching);
      })
      .catch(error => console.error(error));
  }, [searchInput]);

  const handlePrint = (id) => {
    alert(`Printing receipt with ID: ${id}`);
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:5500/api/receipt/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setReceiptData(prevData => prevData.filter(item => item._id !== id));
          setMatchingReceipt(null);
        } else {
          console.error('Failed to delete receipt');
        }
      })
      .catch(error => console.error(error));
  }

  return (
    <div>
      <input
      style={{border:'2px solid black'}}
        type="text"
        placeholder="Search by Phone Number"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {matchingReceipt && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Phone Number</th>
              <th>Total Cost</th>
              <th>Paying Amount (Paid)</th>
              <th>Balance Amount</th>
              <th>Print</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr key={matchingReceipt._id}>
              <td>{matchingReceipt._id}</td>
              <td>{matchingReceipt.phoneNumber}</td>
              <td>{matchingReceipt.currentBalance}</td>
              <td>{matchingReceipt.payingAmount}</td>
              <td>{matchingReceipt.remainingAmount}</td>
              <td>
                <button onClick={() => handlePrint(matchingReceipt._id)}>Print</button>
              </td>
              <td>
                <button onClick={() => handleDelete(matchingReceipt._id)}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReceiptShow;
