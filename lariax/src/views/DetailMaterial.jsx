import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function BeliMaterialDetail() {
  const location = useLocation();
  const materialData = location.state ? location.state.materialData : null;

  console.log("Location State:", location.state);

  console.log("Material Data:", materialData); // Log material data

  // Render material details
  return (
    <div>
      <Navbar />
      <img
        src="Herosection.png"
        alt=""
        style={{ width: "100%", zIndex: -1, position: "absolute" }}
      />
      {materialData ? (
        <div>
          <h2>Material Detail</h2>
          <div>ID: {materialData.id}</div>
          <div>Nama: {materialData.nama}</div>
          <div>Deskripsi: {materialData.deskripsi}</div>
          <div>Kategori: {materialData.kategori}</div>
          <div>Stok: {materialData.stok}</div>
          <div>Harga: {materialData.harga}</div>
          {/* Render other details */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
