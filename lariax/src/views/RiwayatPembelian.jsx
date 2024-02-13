import React, { useState, useEffect } from "react";
import axiosClient from "../axios-Client";

export default function RiwayatPembelian() {
  const [riwayatPembelian, setRiwayatPembelian] = useState([]);

  useEffect(() => {
    // Fetch riwayatPembelian history data from the server
    axiosClient.get("/riwayatpembelian")
      .then(response => {
        setRiwayatPembelian(response.data);
      })
      .catch(error => {
        console.error("Error fetching riwayatPembelian history:", error);
      });
  }, []);

  return (
    <div>
      <h2>Riwayat Pembelian</h2>
      <table>
        <thead>
          <tr>
            <th>Material ID</th>
            <th>Quantity</th>
            <th>Alamat</th>
            <th>Nama Material</th>
            <th>Nama Pembeli</th>
            <th>No HP</th>
            <th>Status</th>
            <th>Waktu Pembelian</th>
          </tr>
        </thead>
        <tbody>
          {riwayatPembelian.map((riwayat, index) => (
            <tr key={index}>
              <td>{riwayat.material_id}</td>
              <td>{riwayat.quantity}</td>
              <td>{riwayat.alamat}</td>
              <td>{riwayat.namamaterial}</td>
              <td>{riwayat.namapembeli}</td>
              <td>{riwayat.nohp}</td>
              <td>{riwayat.status}</td>
              <td>{new Date(riwayat.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
