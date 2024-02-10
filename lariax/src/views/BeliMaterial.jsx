import React, { useEffect, useState } from "react";
import { Card, Form } from "grommet";
import Navbar from "./Navbar";
import axiosClient from "../axios-Client";
import Paginator from "../components/Paginator";
import { Link } from "react-router-dom";

export default function BeliMaterial() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    getMaterials();
  }, []);

  const getMaterials = () => {
    setLoading(true);
    axiosClient
      .get(`/materials`)
      .then(({ data }) => {
        setLoading(false);
        setMaterials(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const totalPages = Math.ceil(materials.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    let filteredMaterials = materials;
    if (selectedCategories.length > 0) {
      filteredMaterials = materials.filter(material =>
        selectedCategories.includes(material.kategori)
      );
    }

    return filteredMaterials.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(prevCategories =>
        prevCategories.filter(cat => cat !== category)
      );
    } else {
      setSelectedCategories(prevCategories => [...prevCategories, category]);
    }
  };

  return (
    <div>
      <Navbar />
      <img
        src="Herosection.png"
        alt=""
        style={{ width: "100%", zIndex: -1, position: "absolute" }}
      />

      {/* Category selection */}
      <>


  {/* Render buttons for each category */}
  <button
  onClick={() => {
    handleCategoryChange("genteng");
    setCurrentPage(1);
  }}

    className="btn border border-dark bg-gradient-to-r from-indigo-300 from-10% via-sky-200 via-30% to-emerald-200 to-90%"
    style={{
      marginTop: '200px',
      backgroundColor: selectedCategories.includes("genteng") ? 'lightgreen' : '#9D6055',
      border: '1px solid black',
      borderRadius: '150px',
      padding: '2px 10px',
      cursor: 'pointer'
      ,marginLeft:'80px'
    }}
  >
    Filter Kategori Genteng
  </button>
  <button
  onClick={() => {
    handleCategoryChange("batu");
    setCurrentPage(1);
  }}
    className="btn border border-dark bg-gradient-to-r from-indigo-300 from-10% via-sky-200 via-30% to-emerald-200 to-90%"
    style={{
      marginTop: '200px',
      backgroundColor: selectedCategories.includes("batu") ? 'lightgreen' : '#87999f',
      border: '1px solid black',
      borderRadius: '150px',
      padding: '2px 10px',
      cursor: 'pointer'
      ,marginLeft:'80px'
    }}
  >
    Filter Kategori Batu
  </button>
  <button
  onClick={() => {
    handleCategoryChange("fondasi");
    setCurrentPage(1);
  }}
    className="btn border border-dark bg-gradient-to-r from-indigo-300 from-10% via-sky-200 via-30% to-emerald-200 to-90%"
    style={{
      marginTop: '200px',
      backgroundColor: selectedCategories.includes("fondasi") ? 'lightgreen' : '#b8baba',
      border: '1px solid black',
      borderRadius: '150px',
      padding: '2px 10px',
      cursor: 'pointer',
      marginLeft:'80px'
    }}
  >
    Filter Kategori Fondasi
  </button>
  <button
  onClick={() => {
    handleCategoryChange("pasir");
    setCurrentPage(1);
  }}
    className="btn border border-dark bg-gradient-to-r from-indigo-300 from-10% via-sky-200 via-30% to-emerald-200 to-90%"
    style={{
      marginTop: '200px',
      backgroundColor: selectedCategories.includes("pasir") ? 'lightgreen' : '#f6d7b0',
      border: '1px solid black',
      borderRadius: '150px',
      padding: '2px 10px',
      cursor: 'pointer'
      ,marginLeft:'80px'
    }}
  >
    Filter Kategori Pasir
  </button>
  <button
  onClick={() => {
    handleCategoryChange("baja");
    setCurrentPage(1);
  }}
    className="btn border border-dark bg-gradient-to-r from-indigo-300 from-10% via-sky-200 via-30% to-emerald-200 to-90%"
    style={{
      marginTop: '200px',
      backgroundColor: selectedCategories.includes("baja") ? 'lightgreen' : '#AAA9AD',
      border: '1px solid black',
      borderRadius: '150px',
      padding: '2px 10px',
      cursor: 'pointer'
      ,marginLeft:'80px'
    }}
  >
    Filter Kategori Baja
  </button>


</>

      {/* Material cards */}
      <div style={{ marginTop: "60px",marginLeft:'80px', display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {getCurrentPageData().map((material) => (
          <Card key={material.id} className="card animated fadeInDown mt-4 bg-gradient-to-r from-cyan-200 to-blue-100" style={{ color: 'black' }}>
            {/* Render material details */}
            <div>ID: {material.id}</div>
            <div>Nama: {material.nama}</div>
            <div>Deskripsi: {material.deskripsi}</div>
            <div>Kategori: {material.kategori}</div>
            <div>Stok: {material.stok}</div>
            <div>Harga: {material.harga}</div>
            <div>Gambar:
               <img
                 src={`http://localhost:8000/storage/images/${material.gambar}`}
                 style={{ width: "100px", height: "100px" }}
                 alt="Belum Ada Gambar"
               />
            </div>
            <Link
              to={{
                pathname: `/BeliMaterialDetail/${material.id}`,
                state: { materialData: material }  // Pass material data as state
              }}
              className="bg-gradient-to-l from-cyan-300 to-blue-400 text-white rounded hover-button p-2 mt-2"
            >
              Beli
            </Link>
          </Card>
        ))}
      </div>

      {/* Paginator */}
      <div style={{ marginTop: "20px" }}>
        <Paginator
          currentPage={currentPage}
          lastPage={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
