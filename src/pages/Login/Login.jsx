import React from 'react';
import './login.css';
import { Flex, Tag , Input , Button,message, Space } from 'antd';
import { createClient } from "@supabase/supabase-js";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';
import { useEffect } from 'react';
import  loginimg from '../../assets/loginimg.svg';
import  eyelash from '../../assets/eyelash.svg';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);


function Login() {

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const navigate = useNavigate();
    const {user,login} = useUser();
    const [messageApi, contextHolder] = message.useMessage();

    function handleEmail(e)
    {
        setEmail(e.target.value);
    }
    function handlePassword(e)
    {
        setPassword(e.target.value);
    }


    useEffect(()=>
    {
      if(user)
      {
        navigate('/dashboard', { replace: true });
      }
    }, [user, navigate]);

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error)
          {
            console.error("Login attempt failed !",error);
            alert("Login Failed !",error)
          }
          else if (email ==="alanjosesanto@outlook.com")
          {
            // alert('Logged in successfully!');
            message.success("Successfully Logged In!");
            
            console.log(data);
            login(data.user.email);
            navigate('/dashboard');
          }
    }

  return (
    
    <div>
        {contextHolder}
        
        <div className="stLogHead">
            <img className='loginimg' src={loginimg} alt="" />
            <h3 className='logname'>LOGIN</h3>
            <h2 className='loginSubt'>Email Address</h2>
            <Input className='loginInput' onChange={handleEmail} style={{width:"400px",margin:"10px"}} type='email' placeholder='Enter Email'></Input>
            <h2 className='loginSubt'>Password</h2>
            <div class="password-input-container">
              <Input className='loginInput' onChange={handlePassword} type='password' style={{width:"400px",margin:"10px"}} placeholder='Enter Password '></Input>
              <button className="eyelash-button" id="togglePassword"><img className='eyelash' src={eyelash} alt="" /></button>
            </div>
           
            <Button className='loginButton' onClick={handleLogin}>Login</Button>
        </div>
    </div>
  )
}

export default Login