import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import baseurl from "../../utils/baseurl";


const Register = () => {
  const search = useLocation().search;
  const urlParams = new URLSearchParams(search).get("referralCode");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [paramId, setParamId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('referralCode: ', urlParams);
    setParamId(urlParams);
  }, []);


  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const rewardUser = async (registeredUserId) => {
    try {
      const url = `${baseurl}/api/users/${registeredUserId}/rewarduser/${paramId}`;
      const { data } = await axios.post(url);
      console.log(data);
    } catch(error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${baseurl}/api/users/signup`;
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
      localStorage.setItem("userId", res.userId);
      localStorage.setItem("userEmail", data.email);
      if(paramId !== null){
        await rewardUser(res.userId);
      }
      setLoading(false);
      window.location = "/webcam";
    } 
    catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Login
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <button type="submit" className={styles.green_btn}>
              Register
            </button>
            {loading && <div className="loader"></div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
