import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../axios-Client";
import Swal from "sweetalert2";
import { useStateContext } from "../context/ContextProvider";

export default function DetailMaterial() {
  const { id } = useParams();
  const [material, setMaterial] = useState({
    id: null,
    nama: "",
    namapembeli:"",
    nohp:"",
    status:"",
    deskripsi: "",
    kategori: "",
    stok: "",
    harga: "",
    gambar: "",
    alamat: "",
  });
  const [quantity, setQuantity] = useState(1); // Initialize quantity with 1
  const [nohp, setNohp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [namapembeli, setNamaPembelli] = useState("");


  const {user} = useStateContext();
  console.log(user.name);

  useEffect(() => {
    axiosClient
      .get(`/materials/${id}`)
      .then(({ data }) => {
        setMaterial(data.data);
      })
      .catch(() => {});
  }, []);

  // Function to handle increase in quantity
  const increaseQuantity = () => {
    if (quantity < material.stok) {
      setQuantity(quantity + 1);
    }
  };

  // Function to handle decrease in quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePurchase = () => {
    const nomorhp = parseInt(nohp);
    axiosClient.post("/pembelian", {
        material_id: material.id,
        quantity: quantity,
        namamaterial: material.nama,
        namapembeli: user.name,
        nohp: nomorhp,
        alamat: alamat,
        status: 'belum dikonfirmasi'
      })
      .then((response) => {
        console.log(axiosClient.post);
        Swal.fire({
          icon: 'success',
          title: 'Pembelian Berhasil!',
          text: response.data.message
        }).then(() => { // Use .then() to handle "OK" button click
          // Redirect to /belimaterial
          window.location.href = "/riwayatpembelian";
        });
      })
      .catch((error) => {
        console.error("Error purchasing material:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
      });
  };


  return (
    <div className="bg-white shadow-md rounded my-6 mx-4 p-4">
      <img
        src="../Herosection.png" // Check if this path is correct
        alt=""
        className="w-full absolute inset-0 z-0"
      />
      <div className="relative z-10">
        <h2 className="text-2xl font-semibold mb-2" style={{ color: 'white' }}>Detail Material</h2>
        <div className="mb-4">ID: {id}</div>
        <table className="table-auto w-full">
          <tbody>
            <TableRow title="Nama" value={material.nama} />
            <TableRow title="Deskripsi" value={material.deskripsi} />
            <TableRow title="Kategori" value={material.kategori} />
            <TableRow title="Harga" value={material.harga} />
            <tr>
              <td className="border px-4 py-2 bg-sky-500">Quantity:</td>
              <td className="border px-4 py-2 bg-sky-500">
                <div className="flex items-center">
                  <button
                    style={{ color: 'red' }}
                    onClick={decreaseQuantity}
                    className="bg-gray-300 text-gray-600 px-2 py-1 rounded-l"
                  >
                    -
                  </button>
                  <input
                    style={{ color: 'black', backgroundColor: 'darkgoldenrod' }}
                    type="number"
                    className="w-16 text-center border border-gray-300"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    disabled={quantity >= material.stok}
                  />
                  <button
                    style={{ color: 'green' }}
                    onClick={increaseQuantity}
                    className="bg-gray-300 text-gray-600 px-2 py-1 rounded-r"
                    disabled={quantity >= material.stok}
                  >
                    +
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 bg-sky-500">Nomor HP:</td>
              <td className="border px-4 py-2 bg-sky-500">
                <div className="flex items-center">
                  <input
                    style={{ color: 'black', backgroundColor: 'darkgoldenrod' }}
                    type="TEL"
                    className="w-50 text-center border border-gray-300"
                    value={nohp}
                    onChange={(e) => setNohp(e.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 bg-sky-500">Alamat:</td>
              <td className="border px-4 py-2 bg-sky-500">
                <div className="flex items-center">
                  <input
                    style={{ color: 'black', backgroundColor: 'darkgoldenrod' }}
                    type="text"
                    className="w-78 text-center border border-gray-300"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mb-4">
          Gambar:
          <img
          style={{width:'300px',height:'200px'}}
            src={`http://localhost:8000/storage/images/${material.gambar}`}
            className="w-24 h-24"
            alt="Belum Ada Gambar"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePurchase} >
          Beli
        </button>
        <Link
          to="/BeliMaterial"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Kembali
        </Link>
      </div>
    </div>
  );

}

// TableRow component to render each row of the table
function TableRow({ title, value }) {
  return (
    <tr>
      <td className="border px-4 py-2 bg-sky-600">{title}:</td>
      <td className="border px-4 py-2 bg-sky-400">{value}</td>
    </tr>
  );
}
