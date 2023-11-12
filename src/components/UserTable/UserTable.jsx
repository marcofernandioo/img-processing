import './UserTable.css'
export default function UserTable(){
    return (
        <table className="user-table">
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
                        <button className="edit-btn">Edit</button>
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
                
        </table>
        
    )
}