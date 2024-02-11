import { useEffect, useState } from "react"
import axiosClient from "../axios-Client"
import { Link } from "react-router-dom"

export default function Users() {

  const[users, setUser] = useState([])
  const [loading, setLoading] = useState (false)

  useEffect( () => {
    getUsers();
  }, [])

  const onDelete = (u) => {
    if (!window.confirm("Yakin Ingin menghapus akun ini?")) {
      return
    }

    axiosClient.delete( `/users/${u.id}`)
    .then(()  => {
      //TODO show notification
      getUsers()
    })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get(`/users`)
    .then(({data}) => {
      setLoading(false)
      console.log(data);
      setUser(data.data)
    })
    .catch(() => {
      setLoading(false)
    })
  }

    return (
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h1>Dashboard Users</h1>

          <Link to="/users/new" className="btn-add">Tambah</Link>
          </div>
          <table>
              <thead>

                <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Waktu Pembuatan Akun</th>
            <th>Role</th>
            <th>Actions</th>
            </tr>
            </thead>

            {loading &&
             <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  loading...
                </td>
              </tr>
            </tbody>}
            <tbody>
              {users.map(u => (
              <tr>
             <td>{u.id}</td>
             <td>{u.name}</td>
             <td>{u.email}</td>
             <td>{u.created_at}</td>
             <td>{u.role}</td>
             <td>
              <Link className="btn-edit" to={'/users/'+u.id}>Edit</Link>
              &nbsp;
              <button onClick = { ev => onDelete(u)} className="btn-delete">Delete</button>
             </td>
             </tr>
              ))}
            </tbody>
            </table>
        </div>
    )
}
