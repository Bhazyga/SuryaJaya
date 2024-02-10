import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-Client"
export default function MaterialForm() {
const {id} = useParams()
const navigate = useNavigate();
const [loading , setLoading] = useState(false)
const [errors, setErrors] = useState( null);
const [Material, setMaterial] = useState( {
  id: null,
  nama: '',
  deskripsi:'',
  kategori: '',
  stok: '',
  harga:'',
  gambar:'',

})




const decodeImageFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageDataURL = reader.result;
      resolve(imageDataURL);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
};

const handleImageChange = (ev) => {
  const file = ev.target.files[0];
  if (file) {
    decodeImageFile(file)
      .then((imageDataURL) => {
        setMaterial({ ...Material, gambar: imageDataURL });
      })
      .catch((error) => {
        console.error("Error decoding image file:", error);
      });
  }
};


useEffect(() => {
  setLoading(true);
  axiosClient.get(`/materials/${id}`)
    .then(({ data }) => {
      setLoading(false);
      setMaterial(data.data); //Ini ada di dalam data pas di consolelog makanya begini
    })
    .catch(() => {
      setLoading(false);
    });
}, []);


const onSubmit = (ev) => {
  ev.preventDefault();
  if (Material.id) {
    axiosClient.put(`/materials/${Material.id}`, Material)
    .then(()  => {
      //TODO show notification
      navigate('/materials')
    })
    .catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors)
      }
    })
  } else {
    axiosClient.post(`/materials`, Material)
    .then(()  => {
      //TODO show notification
      navigate('../../materials')
    })
    .catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors)
      }
    })

  }
}

console.log(Material);

  return(

    <>
      {Material.id && <h1>Update Material:{Material.nama} </h1>}
      {!Material.id && <h1>Material Baru</h1>}
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
            <input value={Material.nama} onChange={ev => setMaterial({...Material,nama: ev.target.value})} placeholder="Nama" />
            <input value={Material.deskripsi} onChange={ev => setMaterial({...Material,deskripsi: ev.target.value})} placeholder="Deskripsi" />
            <select value={Material.kategori} onChange={ev => setMaterial({...Material, kategori: ev.target.value})}>
              <option value="">Pilih Kategori</option>
              <option value="genteng">Genteng</option>
              <option value="batu">Batu</option>
              <option value="cat">Cat</option>
              <option value="fondasi">Fondasi</option>
              <option value="semen">Semen</option>
              <option value="lantai">Lantai</option>
            </select>
            <input value={Material.stok} onChange={ev => setMaterial({...Material,stok: ev.target.value})} placeholder="Stok" />
            <input value={Material.harga} onChange={ev => setMaterial({...Material,harga: ev.target.value})} placeholder="Harga" />
            <div>
      {/* Input for selecting image file */}
      <input type="file" accept=".jpg,.jpeg" onChange={handleImageChange} />
      {/* Display the image */}
      {Material.gambar && (
          <div>
            <img src={Material.gambar} alt="Material" />
            {/* Log the Material.gambar state */}
            {console.log(Material.gambar)}
          </div>
        )}
    </div>
              <button className="btn">Save</button>
            </form>
          </div>
}
      </div>
    </>
  )
}
