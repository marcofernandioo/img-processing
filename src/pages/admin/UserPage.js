import { useEffect } from "react";
import UserTable from "../../components/UserTable/UserTable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./UserPage.css"
import { useState } from "react";
import AddUserForm from "../../components/AddUserForm/AddUserForm";

export default function UserPage(){
    const [addFormActive, setAddFormActive] = useState(false);

    const handleAddFormBtn = () => {
        // Toggle the addFormActive state
        setAddFormActive((prevActive) => !prevActive);
      };

    useEffect(() => {
        console.log("uwu", addFormActive);
    }, [addFormActive]); // Include addFormActive in the dependency array
    return (
        <div className="Userpage">
      <Sidebar />
      <Navbar />
        <div className="content">
        <div className="header-page">
          <div className="dropdown">
            <span id="user-text">User</span>
            <div className="dropdown-content">
              <a href="admin" className="dropdown-item">
                Admin
              </a>
              <a href="user" className="dropdown-item">
                User
              </a>
            </div>
          </div>
          <button className="add-user" onClick={handleAddFormBtn}>
            Add a new user
          </button>
        </div>
        <UserTable />
      </div>
      <AddUserForm isActive={addFormActive} />
      </div>
        
    );
}