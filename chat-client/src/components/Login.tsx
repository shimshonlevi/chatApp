import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {loginRoute}from '../utils/APIRoutes'

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });

  const toastOptions: {
    position: ToastPosition;
    autoClose: number;
    pauseOnHover: boolean;
    draggable: boolean;
    theme: string;
  } = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      console.log("user logged in aaaaaaaa",localStorage.getItem('chat-app-user'));
      
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidate()) {
     
      // console.log('in validation',loginRoute);
      
      
      const {password,username} = values
      const {data} = await axios.post(loginRoute, {
        username,
        password,
     })
     
      if(data.status === false){
        
        toast.error(data.msg, toastOptions);
      }else
      if(data.status === true){
        
        // localStorage.removeItem('chat-app-user');
        
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        console.log('user logged in',data.user);
        
        toast.success("User Created Successfully",toastOptions)
        navigate('/Chat') 
      }else{
        toast.error(data.msg, toastOptions);
      }
      // navigate('/Chat');
     
    }
  };

  const handleValidate = (): boolean => {
    const { password, username } = values;

    if (password.length ===0) {
      toast.error('Password is required', toastOptions);
      return false;
    }
    if (username.length===0) {
      toast.error('Username should be at least 3 characters', toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div className="brand">
          <img src={Logo} alt="Logo" />
          <h1>Snappy</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          min="3"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Login In</button>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </FormContainer>
  );
};

const FormContainer = Styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      font-size: 2rem;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #4e0eff;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;

      &:hover {
        background-color: #997af0;
      }
    }

    span {
      color: white;
      text-transform: uppercase;

      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
