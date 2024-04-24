import { useState,useEffect,useContext } from 'react'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import './App.css'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import AddNewDoctor from './components/AddNewDoctor';
import AddNewAdmin from './components/AddNewAdmin';
import Messages from './components/Messages';
import Doctor from './components/Doctor';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from './main';
import axios from 'axios';


function App() {
  const {isAuthenticated,setIsAuthenticated,setUser}= useContext(Context)


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
  <>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/login"} element={<Login/>} />
          
          <Route path={"/doctor/addnew"} element={<AddNewDoctor/>} />
          <Route path={"/admin/addnew"} element={<AddNewAdmin/>} />
          <Route path={"/msg"} element={<Messages/>} />
          <Route path={"/doctors"} element={<Doctor/>} />





        </Routes>

        <ToastContainer position="top-center" />
      </Router>
  </>
  )
}

export default App
