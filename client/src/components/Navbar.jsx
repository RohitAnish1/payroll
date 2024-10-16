import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Payroll Management
        </Typography>
        <>
  <Button color="inherit" component={Link} to="/">
    Dashboard
  </Button>
  <Button color="inherit" component={Link} to="/employees">
    Employees
  </Button>
  <Button color="inherit" component={Link} to="/payroll">
    Payroll
  </Button>
  <Button color="inherit" component={Link} to="/attendance">
    Attendance
  </Button>
  <Button color="inherit" component={Link} to="/leave">
    Leave
  </Button>
  <Button color="inherit" component={Link} to="/reports">
    Reports
  </Button>
  {auth.token ? (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
      <Button color="inherit" component={Link} to="/register">
        Register
      </Button>
    </>
  )}
</>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
