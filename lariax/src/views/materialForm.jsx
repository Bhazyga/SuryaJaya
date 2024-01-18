import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-Client"
export default function MaterialForm() {
const {id} = useParams()
const navigate = useNavigate();
const [loading , setLoading] = useState(false)
const [errors, setErrors] = useState( null);
const [material, setMaterial] = useState( {
  id: null,
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})



if (id) {
  useEffect( () => {

    setLoading(true)
    axiosClient.get(`/Material/${id}`)
      .then(({data}) => {
        setLoading(false)
        setMaterial(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])
}

const onSubmit = (ev) => {
  ev.preventDefault();
  if (material.id) {
    axiosClient.put(`/Material`, material)
    .then(()  => {
      //TODO show notification
      navigate('/Material')
    })
    .catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors)
      }
    })
  } else {
    axiosClient.post(`/Material`, material)
    .then(()  => {
      //TODO show notification
      navigate('../../Material')
    })
    .catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors)
      }
    })

  }
}


  return(

    <>
      {material.id && <h1>Update Material:{material.name} </h1>}
      {!material.id && <h1>Material Baru</h1>}
      <div className="card animated fadeInDown">
        {loading && (
           <div className="text-center">Loading...</div>
        )}
             {errors &&
             <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]} </p>
            ))}
            </div>
          }
          {!loading &&
                <div className="card animated fadeInDown">
          <form onSubmit={onSubmit}>
            <input value={material.name} onChange={ev => setMaterial({...material,name: ev.target.value})} placeholder="Nama" />
            <input value={material.email} onChange={ev => setMaterial({...material,email: ev.target.value})} placeholder="Email" />
            <input onChange={ev => setMaterial({...material,password: ev.target.value})} placeholder="Password" />
            <input onChange={ev => setMaterial({...material,password_confirmation: ev.target.value})} placeholder="Password Confirmation" />
            <button className="btn">Save</button>
          </form>
          </div>
}
      </div>
    </>
  )
}
