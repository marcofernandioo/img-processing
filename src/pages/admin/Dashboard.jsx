import Navbar from "../../components/navbar/Navbar";


export default function Dashboard(){
    return (
        <div className="Dashboard">
            <Navbar />
            <Sidebar />
            
            <div className="content">
            <a> this is fake dashboard</a>
            </div>
        </div>
        
    )
}