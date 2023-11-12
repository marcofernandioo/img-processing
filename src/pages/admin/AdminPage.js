import EmployeeTable from "../../components/EmployeeTable/EmployeeTable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./AdminPage.css"

export default function AdminPage(){
    return (
        <div className="Adminpage">
            <Sidebar />
            <Navbar />
            
            <div className="content">
                <div class="dropdown">
                    <span id="admin-text">Admin</span>
                    <div class="dropdown-content">
                        <a href="admin" className="dropdown-item">Admin</a>
                        <a href="user" className="dropdown-item">User</a>
                    </div>
                </div>
                <EmployeeTable/>
            </div>
        </div>
        
    )
}