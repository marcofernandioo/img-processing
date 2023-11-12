import { useEffect, useState } from 'react';
import './AddAdminForm.css';

export default function AddAdminForm({ isActive }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

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
    <div className={`new-admin-popup ${(active) ? "active" : ""}`} onClick={handlePopupClick}>
      <div className="new-admin-form" onClick={(e) => e.stopPropagation()}>
        {/* Prevent propagation to the parent div (new-admin-popup) */}
        <h2>Add New Admin</h2>
        <form className="add-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label><br></br>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} /><br></br>
          <label htmlFor="email">Email:</label><br></br>
          <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br></br>
          <label htmlFor="phone">Telephone:</label><br></br>
          <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} /><br></br>
          <label htmlFor="position">Position:</label><br></br>
          <input type="text" id="position" name="position" value={position} onChange={(e) => setPosition(e.target.value)} /><br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
