

import { useState } from 'react';
import './CustomerTable.css'
import { useEffect } from 'react';
import EditCustomerForm from '../EditCustomerForm/EditCustomerForm';
export default function CustomerTable(){
    const [editFormActive, setEditFormActive] = useState(false);

    const handleEditFormBtn = () => {
      // Toggle the addFormActive state
      setEditFormActive((prevActive) => !prevActive);
    };
    useEffect(() => {
      console.log("edit sukses", editFormActive);
    }, [editFormActive]); // Include addFormActive in the dependency array
    return (
        <table className="customer-table">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Subscription</th>
                    <th>Company Name</th>
                    <th>actions</th>
                </tr>
                <tr>
                    <td>fake Nico</td>
                    <td>nicoramli@gmail.com</td>
                    <td>0895411041801</td>
                    <td>Chad</td>
                    <td>Company of Chadwicks</td>
                    <td className='action-cell'>
                        <button className="edit-btn" onClick={handleEditFormBtn}>Edit</button>
                        <button className="delete-btn">Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>2nd Nico</td>
                    <td>nicoramli@gmail.com</td>
                    <td>0895411041801</td>
                    <td>Sigma male</td>
                    <td>Sigest Male</td>
                    <td className='action-cell'>
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>3rd Nico</td>
                    <td>nicoramli@gmail.com</td>
                    <td>0895411041801</td>
                    <td>Even better Nico</td>
                    <td>Alpha Academy</td>
                    <td className='action-cell'>
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                    </td>
                </tr>
                <EditCustomerForm isActive={editFormActive} />
        </table>
        
    )
}