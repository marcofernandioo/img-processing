import "./Navbar.css"
export default function Navbar(){
    return (
        <div className="NavBar">
            <div className="left-navbar">
            <a>Welcome X</a>
            </div>
            <div className="right-navbar">
            <a class="btn" href=""><i class="fa fa-bell fa-lg"></i></a>
            <a class="btn-img" href=""><img src="https://i.kym-cdn.com/entries/icons/original/000/002/691/sings.jpg"></img></a>
            </div>
        </div>
    )
}