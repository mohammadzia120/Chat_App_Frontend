import axios from "axios";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";
import "./CSS/chats.css";

const Chats = () => {
  // const fetchChats = async () => {
  //   // const { chatsData } = await axios.get("api/chat");
  //   console.log(chatsData);
  // };

  // useEffect(() => {
  //   fetchChats();
  // }, []);
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box className="horizontal">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chats;
