import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  TextField,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);
  const [snackbar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackBar({ ...snackbar, open: false });
  };

  const handleEye = () => {
    setEye(!eye);
  };
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const { email, password } = data;
      setLoading(true);
      const response = await axios({
        url: "http://localhost:5000/login",
        method: "POST",
        data: {
          email,
          password,
        },
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log("response", response);
      setLoading(false);
      if (response.data.status === 200) {
        localStorage.setItem("UserInfo", JSON.stringify(response.data));
        setSnackBar({
          open: true,
          message: "Login Successfull",
          severity: "success",
          variant: "filled",
        });
        navigate("/chats");
        // setTimeout(() => {
        //   navigate("/chats");
        // }, 1000);
      } else {
        setSnackBar({
          open: true,
          message: "Login failed",
          severity: "error",
          variant: "filled",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSnackBar({
        open: true,
        message: "Login failed",
        severity: "error",
        variant: "filled",
      });
    }
  };
  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="email" required>
        <TextField
          label="Email"
          required
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid Email Id",
            },
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        ></TextField>
      </FormControl>

      <FormControl id="password" required>
        <TextField
          label="Password"
          required
          type={eye ? "text" : "password"}
          {...register("password", {
            required: "Required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                "Password must have at least 8 characters, one lowercase letter, one uppercase letter and one number",
            },
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleEye}>
                  {eye ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </FormControl>

      <Button
        sx={{ width: "15%" }}
        variant="contained"
        color="primary"
        type="submit"
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant={snackbar.variant}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Login;
