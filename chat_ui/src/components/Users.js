import React, { useContext, useEffect, useState } from "react";
import "./myStyles.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { refreshSidebarFun } from "../Features/refreshSidebar";
import { myContext } from "./MainContainer";

function Users() {
  const { refresh, setRefresh } = useContext(myContext);
  const lightTheme = useSelector((state) => state.themeKey);
  const [users, setUsers] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) {
      console.log("User not Authenticated");
      nav("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userData.data.token}`,
          },
        };
        const response = await axios.get("http://localhost:8080/user/getall", config);
        const fetchedUsers = response.data.data || []; // Adjust to match the response structure

        // Exclude the logged-in user
        const filteredUsers = fetchedUsers.filter(user => user._id !== userData.data._id);

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, [refresh, userData, nav]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
        className="list-container"
      >
        <div className={"ug-header" + (lightTheme ? "" : " dark")}>
          <img
            src={"https://cdn-icons-png.flaticon.com/128/476/476863.png"}
            style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
          />
          <p className={"ug-title" + (lightTheme ? "" : " dark")}>Available Users</p>
          <IconButton
            className={"icon" + (lightTheme ? "" : " dark")}
            onClick={() => setRefresh(!refresh)}
          >
            <RefreshIcon />
          </IconButton>
        </div>
        <div className={"sb-search" + (lightTheme ? "" : " dark")}>
          <IconButton className={"icon" + (lightTheme ? "" : " dark")}>
            <SearchIcon />
          </IconButton>
          <input placeholder="Search" className={"search-box" + (lightTheme ? "" : " dark")} />
        </div>
        <div className="ug-list">
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user, index) => (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={"list-item" + (lightTheme ? "" : " dark")}
                key={user._id || index} // Use a unique identifier
                onClick={() => {
                  console.log("Creating chat with ", user.name);
                  const config = {
                    headers: {
                      Authorization: `Bearer ${userData.data.token}`,
                    },
                  };
                  axios.post("http://localhost:8080/chat/", { userId: user._id }, config);
                  dispatch(refreshSidebarFun());
                }}
              >
                <p className={"con-icon" + (lightTheme ? "" : " dark")}>T</p>
                <p className={"con-title" + (lightTheme ? "" : " dark")}>{user.name}</p>
              </motion.div>
            ))
          ) : (
            <p>No users available</p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Users;
