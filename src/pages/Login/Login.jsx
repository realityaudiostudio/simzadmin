import React, { useState, useEffect } from 'react';
import './login.css';
import { Input, Button, message } from 'antd';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';
import loginimg from '../../assets/loginimg.svg';
import EyeSlashIcon from '../../assets/eyelash.svg';
import EyeIcon from '../../assets/eyelashopen.svg';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user, login } = useUser();
  const [messageApi, contextHolder] = message.useMessage();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async () => {
  const allowedEmails = ["alanjosesanto@outlook.com", "simzmuzicacademy@gmail.com"]; // ✅ Your allowed emails

  if (!allowedEmails.includes(email.toLowerCase())) {
    messageApi.open({
      type: 'error',
      content: 'You are not authorized to login!',
    });
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login attempt failed!', error);
    messageApi.open({
      type: 'error',
      content: 'Login Failed!',
    });
  } else {
    messageApi.open({
      type: 'success',
      content: 'Logged in successfully!',
    });

    console.log(data);
    login(data.user.email);
    navigate('/dashboard');
  }
};


  return (
    <div>
      {contextHolder}

      <div className="stLogHead">
        <img className="loginimg" src={loginimg} alt="" />
        <h3 className="logname">LOGIN</h3>
        <h2 className="loginSubt">Email Address</h2>
        <Input
          className="loginInput"
          onChange={handleEmail}
          style={{ width: '400px', margin: '10px' }}
          type="email"
          placeholder="Enter Email"
        />
        <h2 className="loginSubt">Password</h2>
        <div className="password-input-container">
          <Input
            className="loginInput"
            onChange={handlePassword}
            type={isPasswordVisible ? 'text' : 'password'}
            style={{ width: '400px', margin: '10px' }}
            placeholder="Enter Password"
          />
          <button onClick={togglePasswordVisibility} className="eyelash-button" id="togglePassword">
            {isPasswordVisible ? <img src={EyeSlashIcon} /> : <img src={EyeIcon} />}
          </button>
        </div>

        <Button className="loginButton" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
    