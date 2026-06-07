import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-logo">Z3</span>
        <span className="brand-name">API Hub</span>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            end
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/students" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Students
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/create" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Create User
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/update" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Update User
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/update-email" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Update Email
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/delete" 
            className={({ isActive }) => isActive ? "nav-link active nav-link-danger" : "nav-link nav-link-danger"}
          >
            Delete User
          </NavLink>
        </li>
        {/* You can add more nav links here as you build more APIs */}
      </ul>
    </nav>
  );
}

export default Navbar;
