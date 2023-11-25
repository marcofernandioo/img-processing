import { useEffect } from "react";
import CustomerTable from "../../components/CustomerTable/CustomerTable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./CustomerPage.css"
import { useState } from "react";
import AddCustomerForm from "../../components/AddCustomerForm/AddCustomerForm";

export default function CustomerPage(){
    const [addFormActive, setAddFormActive] = useState(false);

    const handleAddFormBtn = () => {
        // Toggle the addFormActive state
        setAddFormActive((prevActive) => !prevActive);
      };

    useEffect(() => {
        console.log("uwu", addFormActive);
    }, [addFormActive]); // Include addFormActive in the dependency array
    return (
        <div className="Customerpage">
      <Sidebar />
      <Navbar />
        <div className="content">
        <div className="header-page">
          <div className="dropdown">
            <span id="customer-text">Customer</span>
            <div className="dropdown-content">
              <a href="admin" className="dropdown-item">
                Admin
              </a>
              <a href="customer" className="dropdown-item">
                Customer
              </a>
            </div>
          </div>
          <button className="add-customer" onClick={handleAddFormBtn}>
            Add a new Customer
          </button>
        </div>
        <CustomerTable/>
      </div>
      <AddCustomerForm isActive={addFormActive} />
      </div>
        
    );
}