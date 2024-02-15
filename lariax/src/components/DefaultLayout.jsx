import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-Client";

export default function DefaultLayout () {
  const {user,token, setUser, setToken} = useStateContext()

  console.log(user);

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

console.log(user);

  return (
<div id="defaultLayout">
  <aside>
    <Link to='/dashboard'>Dashboard</Link>
    <Link to='/bangunrumah'>Bangun Rumah</Link>
    {user.role === 'admin' ? (
    <Link to='/users'>Users</Link>
    ) : null}
    {user.role === 'admin' ? (
    <Link to='/Materials'>Material</Link>
    ) : null }
    {user.role === 'admin' ? (
    <Link to='/datapembelian'>Data Pembelian</Link>
    ) : null }

    <Link to='/riwayatpembelian'>Riwayat Pembelian</Link>

    <Link to='/index'>Halaman Utama</Link>
  </aside>
  <div className="content">
    <header>
      <div>
        Hallo {user.name}
      </div>
<div>
 {user.email}
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
