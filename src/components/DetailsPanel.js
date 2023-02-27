import React, { useState } from 'react';
import axios from 'axios';

function DetailsPanel({ item, onSaveChanges }) {
  const [orderNo, setOrderNo] = useState(item.orderNo);
  const [date, setDate] = useState(item.date);
  const [customer, setCustomer] = useState(item.customer);
  const [trackingNo, setTrackingNo] = useState(item.trackingNo);
  const [status, setStatus] = useState(item.status);
  const [consignee, setConsignee] = useState(item.consignee);

  const handleSaveChanges = async () => {
    try {
      const updatedItem = {
        ...item,
        orderNo,
        date,
        customer,
        trackingNo,
        status,
        consignee,
      };

      await axios.put(`https://my.api.mockaroo.com/shipments/${item.orderNo}.json?key=5e0b62d0`, updatedItem);

      onSaveChanges(updatedItem);
      alert(`Order ${orderNo} updated successfully.`);
    } catch (error) {
      console.error(error);
      alert(`Error updating order ${orderNo}.`);
    }
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="orderNo">Order No:</label>
        <input type="text" className="form-control" id="orderNo" value={orderNo}  />
      </div>
      <div className="form-group">
        <label htmlFor="date">Delivery Date:</label>
        <input type="text" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="customer">Customer:</label>
        <input type="text" className="form-control" id="customer" value={customer} onChange={(e) => setCustomer(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="trackingNo">Tracking No:</label>
        <input type="text" className="form-control" id="trackingNo" value={trackingNo}  />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <input type="text" className="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="consignee">Consignee:</label>
        <input type="text" className="form-control" id="consignee" value={consignee} onChange={(e) => setConsignee(e.target.value)} />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
}

export default DetailsPanel;
