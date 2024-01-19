import { useEffect, useState } from "react"
import axiosClient from "../axios-Client"
import { Link } from "react-router-dom"

export default function Materials({}) {

  const [Materials, setMaterials] = useState([])
  const [loading, setLoading] = useState (false)

  useEffect( () => {
    getMaterials();
  }, [])

  const onDelete = (u) => {
    if (!window.confirm("Yakin Ingin menghapus akun ini?")) {
      return
    }

    axiosClient.delete( `/materials/${u.id}`)
    .then(()  => {
      //TODO show notification
      getMaterials()
    })
  }

  const getMaterials = () => {
    setLoading(true)
    axiosClient.get(`/materials`)
    .then(({data}) => {
      setLoading(false)
      console.log(data);
      setMaterials(data.data)
    })
    .catch(() => {
      setLoading(false)
    })
  }

    return (
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h1>Materials</h1>

          <Link to="/materials/new" className="btn-add">Add new</Link>
          </div>
          <table>
              <thead>

                <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Kategori</th>
            <th>Stok</th>
            <th>Harga</th>
            <th>Gambar</th>
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
              {Materials.map(u => (
              <tr>
             <td>{u.id}</td>
             <td>{u.nama}</td>
             <td>{u.deskripsi.slice(0,55)}</td>
             <td>{u.kategori}</td>
             <td>{u.stok}</td>
             <td>{u.harga}</td>
             <td>{u.gambar}</td>
             <td>
              <Link className="btn-edit" to={'/materials/'+u.id}>Edit</Link>
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
