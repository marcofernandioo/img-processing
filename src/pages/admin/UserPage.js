import UserTable from "../../components/UserTable/UserTable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./UserPage.css"

export default function UserPage(){
    return (
        <div className="Userpage">
            <Sidebar />
            <Navbar />
            
            <div className="content">
            <div class="dropdown">
                    <span id="user-text">User</span>
                    <div class="dropdown-content">
                        <a href="admin" className="dropdown-item">Admin</a>
                        <a href="user" className="dropdown-item">User</a>
                    </div>
                </div>
                <UserTable/>
            </div>
        </div>
        
    )
}