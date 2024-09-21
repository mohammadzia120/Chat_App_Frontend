import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  Input,
  IconButton,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// https://api.cloudinary.com/v1_1/{cloud_name}/image/upload - API base URL
const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password"); // watch function is used to get the current value of the 'password' field

  const navigate = useNavigate();
  const [pic, setPic] = useState();
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
  const handleEye = async () => {
    setEye(!eye);
  };
  const postDetails = async (pics) => {
    setLoading(true);
    if (pics === undefined) {
      setLoading(false);
      setSnackBar({
        open: true,
        message: "Image not found",
        severity: "error",
        variant: "filled",
      });
    } else if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpeg" ||
      pics.type === "image/jpg"
    ) {
      const formData = new FormData();
      formData.append("file", pics);
      formData.append("upload_preset", "chat-app");
      formData.append("cloud_name", "zianizami");
      await axios({
        url: "https://api.cloudinary.com/v1_1/zianizami/image/upload",
        method: "POST",
        data: formData,
      })
        .then((res) => {
          setPic(res.data.url.toString());
          setLoading(false);
          setSnackBar({
            open: true,
            message: "Image uploaded successfully",
            severity: "success",
            variant: "filled",
          });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setSnackBar({
        open: true,
        message: "Image format is not valid",
        severity: "error",
        variant: "filled",
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const { name, email, password } = data;
      setLoading(true);
      const response = await axios({
        url: "http://localhost:5000/register",
        method: "POST",
        data: {
          name,
          email,
          password,
          pic,
        },
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(response.data.pic.toString());
      setPic(response.data.pic.toString());
      setLoading(false);
      setSnackBar({
        open: true,
        message: "Registration Successfull",
        severity: "success",
        variant: "filled",
      });
      localStorage.setItem("UserInfo", JSON.stringify(response.data));
      setTimeout(() => {
        navigate("/success");
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSnackBar({
        open: true,
        message: "Registration failed",
        severity: "error",
        variant: "filled",
      });
    }
  };
  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="name" required>
        <TextField
          placeholder="Enter you Name"
          label="Name"
          required
          {...register("name", {
            required: "Required",
            pattern: {
              value: /^[A-Za-z ]+$/,
              message: "Name contains letters and spaces only",
            },
          })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
        ></TextField>
      </FormControl>

      <FormControl id="email" required>
        <TextField
          label="Email"
          required
          placeholder="Enter your email"
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

      <FormControl id="confirmPassword" required>
        <TextField
          label="Confirm Password"
          required
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            pattern: {},
            validate: (value) => value === password || "Password do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={
            errors.confirmPassword ? errors.confirmPassword.message : ""
          }
        ></TextField>
      </FormControl>

      <FormControl id="picture">
        <Input
          type="file"
          label="Upload your Picture"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        ></Input>
      </FormControl>

      <Button
        sx={{ width: "15%" }}
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
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

export default Signup;
