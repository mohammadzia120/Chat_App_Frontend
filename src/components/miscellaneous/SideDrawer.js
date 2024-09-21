import { Button, Menu, Tooltip, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/fontawesome-free-regular";
import Box from "@mui/material/Box";
import React from "react";
import "../CSS/SideDrawer.css";

const SideDrawer = () => {
  return (
    <div>
      <Box className="chatHeader">
        <Tooltip title="Search users to chat" placement="bottom">
          <Button variant="ghost">
            <i class="fa-solid fa-magnifying-glass"></i>
            <Typography
              variant="subtitle1"
              sx={{
                display: { xs: "none", md: "flex" },
                padding: "4px",
                textTransform: "none",
              }}
            >
              Search User
            </Typography>
          </Button>
        </Tooltip>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "25px" }}
          color="#1976d2"
        >
          Real Time Chat App
        </Typography>
        <h1>dflkgslkgj</h1>
      </Box>
    </div>
  );
};

export default SideDrawer;
