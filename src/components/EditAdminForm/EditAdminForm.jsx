import { useEffect, useState } from 'react';
import './EditAdminForm.css';

export default function EditAdminForm({ isActive, adminData }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(isActive);

    // Set the form fields based on the provided adminData
    if (adminData) {
      setName(adminData.name || '');
      setEmail(adminData.email || '');
      setPhone(adminData.telephone || '');
      setPosition(adminData.position || '');
    }
  }, [isActive, adminData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Log the form variables
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Position:", position);

    // Reset the form fields
    setName("");
    setEmail("");
    setPhone("");
    setPosition("");

    // Hide the form after submission
    setActive(false);
  };

  const handlePopupClick = () => {
    // Hide the form if clicked outside the form fields
    setActive(false);
  };

  return (
    <div className={`new-edit-admin-popup ${(active) ? 'active' : ''}`} onClick={handlePopupClick}>
      <div className="new-edit-admin-form" onClick={(e) => e.stopPropagation()}>
        <h2>Edit The Admin</h2>
        <form className="add-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label><br />
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} /><br />
          <label htmlFor="email">Email:</label><br />
          <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
          <label htmlFor="phone">Telephone:</label><br />
          <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} /><br />
          <label htmlFor="position">Position:</label><br />
          <input type="text" id="position" name="position" value={position} onChange={(e) => setPosition(e.target.value)} /><br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
