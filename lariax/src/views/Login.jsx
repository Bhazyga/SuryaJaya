import { Link, } from "react-router-dom";
import axiosClient from "../axios-Client";
import { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";


  export default function Login() {
    const emailRef      = useRef();
    const passwordRef      = useRef();
    const [errors, setErrors] = useState( null);
    const {setUser, setToken} = useStateContext()


  const onSubmit = (ev) => {
    ev.preventDefault()
  const payload = {
    email: emailRef.current.value,
    password: passwordRef.current.value,

  }
  axiosClient.post('/login', payload)
  .then(({data}) => {
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

   return (
    <div className="login-signup-form animated fadeInDown">
      {/* Include an image on the side */}
      <div className="form">
        <div className="form-content">
          <form onSubmit={onSubmit}>
            <h1 className="title">Silahkan Login</h1>

            {errors && (
              <div className="alert">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]} </p>
                ))}
              </div>
            )}

            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button className="btn btn-block">Login</button>
            <p className="message">
              Belum daftar pren? <Link to="/register">Buat Akun</Link>
            </p>
          </form>
        </div>

        {/* Add an image on the side */}
        <div className="side-image">
          <img src="dupir.jpg" alt="Side Image" style={{maxWidth:'211px'}}/>
        </div>
      </div>
    </div>
  );
}
