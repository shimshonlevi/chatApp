import React, { useState ,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {registerRoute}from '../utils/APIRoutes'

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
        // console.log("user logged in aaaaaaaa",localStorage.getItem('chat-app-user'));
        
        navigate('/Chat');
      }
    }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidate()) {
      // console.log('in validation',registerRoute);
      
      const {password,username,email} = values
      const {data} = await axios.post(registerRoute, {
        username,
        email,
        password,
     })
      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true){
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        toast.success("User Created Successfully",toastOptions)
      }
     navigate('/Chat') 
    }
  };

  const handleValidate = (): boolean => {
    const { password, confirmPassword, username, email } = values;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', toastOptions);
      return false;
    }
    if (username.length < 3) {
      toast.error('Username should be at least 3 characters', toastOptions);
      return false;
    }
    if (password.length < 8) {
      toast.error('Password should be at least 8 characters', toastOptions);
      return false;
    }
    if (email.length < 5) {
      toast.error('Email should be at least 5 characters', toastOptions);
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
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
        />
        <button type="submit">Create User</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
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

export default Register;
