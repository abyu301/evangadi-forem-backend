import { useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from '../API/axiosConfig.js'

function Register() {
 const naviget = useNavigate()
 const userNameDom = useRef(null)
 const firstNameDom = useRef(null)
 const lastNameDom = useRef(null)
 const emailDom = useRef(null)
 const passwordDom = useRef(null)

 async function handleSubmit(e) {
  e.preventDefault();
  
  const usernameValue = userNameDom.current.value;
  const firstnameValue = firstNameDom.current.value;
  const lastnameValue = lastNameDom.current.value;
  const emailValue = emailDom.current.value;
  const passwordValue = passwordDom.current.value;

    if (
      !usernameValue || 
      !firstnameValue || 
      !lastnameValue || 
      !emailValue || 
      !passwordValue) {
      alert("Please provide all required fields");
      return;
    }

    try {
      await axios.post('users/register', {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue
      });
      alert("User registered successfully. Please login.");
      naviget('/login');

    } catch (error) {
      alert(error.response.data.msg);
      console.error(error.response.data.msg);
    }
}


  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>username :---</span>
          <input ref={userNameDom} 
                  type="text" 
                  placeholder='username'/>
        </div>
        <br />
        <div>
        <span>First name :---</span>
        <input  ref={firstNameDom} 
                type="text" 
                placeholder='first name'/>
        </div>
        <br />
        <div>
        <span>Last name :---</span>
        <input  ref={lastNameDom} 
                type="text" 
                placeholder='last name'/>
        </div>
        <br />
        <div>
        <span>email :---</span>
        <input  ref={emailDom} 
                type="text" 
                placeholder='email'/>
        </div>
        <br />
        <div>
          <span>Password :---</span>
          <input  ref={passwordDom} 
                  type="password" placeholder='password'/>
        </div>
        <br />
        <button type='submit'>Register</button>
      </form>
      <Link to={"/login"}>login</Link>
    </section>
  )
}

export default Register