import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../api/api";
import { getLocal } from "../../helpers/auth";
import jwtDecode from "jwt-decode";
import axios from "axios";

// Css and bootstrap
import "./home.css";

function Home() {
  const history = useNavigate();
  const [userData, setUserData] = useState(null);
  const token = getLocal();
  const decoded = jwtDecode(token);

  async function getUser() {
    try {
      const userResponse = await axios.get(`${baseUrl}user-detail/${decoded.user_id}/`);
      setUserData(userResponse.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error (e.g., show an error message)
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken');
    history('/login');
  };

  useEffect(() => {
    if (!token) {
      history('/');
    } else {
      getUser();
    }
  }, [token, history]);

  return (
    <div className="maindiv">
      <div style={{ display: "block", width: 500, padding: 30 }}>
        <h4>Welcome, {userData ? userData.username : "no name"}</h4>
        <p>This is the home page. You can add more content here.</p>
        <button onClick={logout} className='btn btn-warning me-4'>Logout</button>
      </div>
    </div>
  );
}

export default Home;
