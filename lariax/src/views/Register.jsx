import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-Client.js";
import { useStateContext } from "../context/ContextProvider.jsx";




  export default function Register(){
    const nameRef       = useRef();
    const emailRef      = useRef();
    const passwordRef      = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState( null);
    const {setUser, setToken} = useStateContext()




  const onSubmit = ev  => {
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_Confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient.post('/register', payload)
    .then(({data}) =>{
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err => {
      const response = err.response;
      if (response && response.status === 422){
        console.log(response.data.errors);
      }
    })
  }




    return(

      <div className="login-signup-form animated fadeInDown" >
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
          Silahkan Daftar

          {errors && <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]} </p>
            ))}
            </div>
          }
          </h1>
          <input ref={nameRef} type="name" placeholder="Nama"/>
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input ref={passwordConfirmationRef} type="password" placeholder="Konfirmasi Password" />
          <button className="btn btn-block">Masuk</button>
          <p className="message">
            Punya akun lu? <Link to="/login">Login</Link>
          </p>
        </form>

        </div>
      </div>
    )




}
