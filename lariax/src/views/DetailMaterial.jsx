import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function BeliMaterialDetail() {
  // Access location object using useLocation hook
  const location = useLocation();

  // Access material data from location state
  const materialData = location.state ? location.state.materialData : null;

  // Check if materialData is available before accessing its properties
  if (!materialData) {
    return <div>Error: Material data not found!</div>;
  }

  console.log(materialData);

  return (
    <div>
      <Navbar />
      <img
        src="Herosection.png"
        alt=""
        style={{ width: "100%", zIndex: -1, position: "absolute" }}
      />

      {/* Render material details */}
      <div>ID: {materialData.id}</div>
      <div>Nama: {materialData.nama}</div>
      <div>Deskripsi: {materialData.deskripsi}</div>
      <div>Kategori: {materialData.kategori}</div>
      <div>Stok: {materialData.stok}</div>
      <div>Harga: {materialData.harga}</div>
      <div>
        Gambar:
        <img
          src={`http://localhost:8000/storage/images/${materialData.gambar}`}
          style={{ width: "100px", height: "100px" }}
          alt="Belum Ada Gambar"
        />
      </div>

      {/* Additional content for purchasing */}
      {/* Add your purchasing logic here */}
    </div>
  );
}
