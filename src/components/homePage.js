import React, { useEffect } from "react";
import { useState } from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Typography } from "@mui/material";

import Login from "./Login";
import Signup from "./Signup";
import "./CSS/homePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chats");
    }
  }, [navigate]);
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Box className="centerd-box-title">
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "25px" }}
          color="#1976d2"
        >
          Real Time Chat App
        </Typography>
      </Box>

      <Box className="centered-content">
        <TabContext value={value}>
          <Box sx={{ width: "100%" }}>
            <TabList
              onChange={handleChange}
              sx={{ width: 1, marginBottom: "1em" }}
              variant="fullWidth"
            >
              <Tab label="Login" value="1" />
              <Tab label="Sign Up" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ whiteSpace: "pre-line" }}>
            <Login />
          </TabPanel>
          <TabPanel value="2" sx={{ whiteSpace: "pre-line" }}>
            <Signup />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default HomePage;
