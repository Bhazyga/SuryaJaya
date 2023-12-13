import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-Client";

export default function DefaultLayout () {
  const {user,token, setUser, setToken} = useStateContext()

  if (!token) {
    return <Navigate to= "/index"/>
  }
  const onLogout = (ev) => {
    ev.preventDefault()

    axiosClient.post( '/logout')
    .then(()  => {
      setUser({})
      setToken(null)
    })
  }

 useEffect( () => {
  axiosClient.get(`/user`)
  .then(({data})  => {
    setUser (data)
  })
 }, [])


  return (
<div id="defaultLayout">
  <aside>
    <Link to='/dashboard'>Dashboard</Link>
    {user.role === 'admin' ? (
    <Link to='/users'>Users</Link>
) : null}
    <Link to='/bangunrumah'>Bangun Rumah</Link>
  </aside>
  <div className="content">
    <header>
      <div>
        Hallo Admin
      </div>
<div>
 {user.name}
 <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
</div>
    </header>
<main>
  <Outlet/>
</main>
</div>
</div>
  )
}
