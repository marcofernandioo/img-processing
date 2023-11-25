import { useEffect } from 'react';
import './EmployeeTable.css';
import { useState } from 'react';
import EditAdminForm from '../EditAdminForm/EditAdminForm';
import MockData from '../MockData/MockData.json';

export default function EmployeeTable() {
  const [editFormActive, setEditFormActive] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const handleEditFormBtn = (admin) => {
    // Set the selected admin and toggle the edit form
    setSelectedAdmin(admin);
    setEditFormActive(true); // Open the edit form when clicking the "Edit" button
  };
  useEffect(() => {
    console.log('edit success', editFormActive);
  }, [editFormActive]); // Include addFormActive in the dependency array

  return (
    <table className="employee-table">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Telephone</th>
        <th>Position</th>
        <th>Actions</th>
      </tr>
      {MockData.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.telephone}</td>
            <td>{employee.position}</td>
            <td className="action-cell">
              <button className="edit-btn" onClick={() => handleEditFormBtn(employee)}>
                Edit
              </button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
        ))}
      {selectedAdmin && <EditAdminForm isActive={editFormActive} adminData={selectedAdmin} />}
    </table>
  );
}
