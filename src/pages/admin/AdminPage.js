import { useState } from "react";
import AddAdminForm from "../../components/AddAdminForm/AddAdminForm";
import EmployeeTable from "../../components/EmployeeTable/EmployeeTable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./AdminPage.css";
import { useEffect } from "react";

export default function AdminPage() {
  const [addFormActive, setAddFormActive] = useState(false);

  const handleAddFormBtn = () => {
    // Toggle the addFormActive state
    setAddFormActive((prevActive) => !prevActive);
  };

  

  useEffect(() => {
    console.log("uwu", addFormActive);
  }, [addFormActive]); // Include addFormActive in the dependency array

  return (
    <div className="Adminpage">
      <Sidebar />
      <Navbar />

      <div className="content">
        <div className="header-page">
          <div className="dropdown">
            <span id="admin-text">Admin</span>
            <div className="dropdown-content">
              <a href="admin" className="dropdown-item">
                Admin
              </a>
              <a href="customer" className="dropdown-item">
                Customer
              </a>
            </div>
          </div>
          <button className="add-admin" onClick={handleAddFormBtn}>
            Add a new admin
          </button>
        </div>
        <EmployeeTable />
      </div>
      <AddAdminForm isActive={addFormActive} />
    </div>
  );
}
