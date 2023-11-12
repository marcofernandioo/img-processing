import './EmployeeTable.css'
export default function EmployeeTable(){
    return (
        <table className="employee-table">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Position</th>
                    <th>actions</th>
                </tr>
                <tr>
                    <td> Nico</td>
                    <td>nicoramli@gmail.com</td>
                    <td>0895411041801</td>
                    <td>Slave</td>
                    <td className='action-cell'>
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>2nd Nico</td>
                    <td>nicoramli@gmail.com</td>
                    <td>0895411041801</td>
                    <td>probably still slave</td>
                    <td className='action-cell'>
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>3rd Nico</td>
                    <td>nicoramli@gmail.com</td>
                    <td>0895411041801</td>
                    <td>Still slave</td>
                    <td className='action-cell'>
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                    </td>
                </tr>
                
        </table>
        
    )
}