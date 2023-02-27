import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DetailsPanel from './components/DetailsPanel';

function Table() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://my.api.mockaroo.com/shipments.json?key=5e0b62d0'
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  const handleDelete = async (orderNo) => {
    try {
      await axios.delete(`https://my.api.mockaroo.com/shipments/${orderNo}.json?key=5e0b62d0`);
      setData(prevData => prevData.filter((item) => item.orderNo !== orderNo));
      alert(`Order ${orderNo} deleted successfully.`);
    } catch (error) {
      console.error(error);
      alert(`Error deleting order ${orderNo}.`);
    }
  };

  const handleViewDetails = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  const handleSaveChanges = async (orderNo, updatedItem) => {
    try {
      await axios.put(`https://my.api.mockaroo.com/shipments/${orderNo}.json?key=5e0b62d0`, updatedItem);
      setData(prevData => prevData.map((item) => item.orderNo === orderNo ? updatedItem : item));
      alert(`Order ${orderNo} updated successfully.`);
    } catch (error) {
      console.error(error);
      alert(`Error updating order ${orderNo}.`);
    }
  };

  return (
    <div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>OrderNo</th>
            <th>DeliveryDate</th>
            <th>Customer</th>
            <th>TrackingNo</th>
            <th>Status</th>
            <th>Consignee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={item.id}>
              <tr>
                <td>{item.orderNo}</td>
                <td>{item.date}</td>
                <td>{item.customer}</td>
                <td>{item.trackingNo}</td>
                <td>{item.status}</td>
                <td>{item.consignee}</td>
                <td class="d-flex justify-content-around">
                  <button type="button" className="btn btn-danger " onClick={() => handleDelete(item.orderNo)}>Delete</button>
                  <button type="button" className="btn btn-primary" onClick={() => handleViewDetails(index)}>
                    {selectedRow === index ? 'Close Details' : 'View Details'}
                  </button>
                </td>
              </tr>
              {selectedRow === index && (
                <tr>
                  <td colSpan="7">
                    <DetailsPanel item={item} onSaveChanges={(updatedItem) => handleSaveChanges(item.orderNo, updatedItem)} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
