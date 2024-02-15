import React, { useState, useEffect } from "react";
import axiosClient from "../axios-Client";

export default function DataPembelian() {
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

  const handleStatusChange = (id) => {
    // Send a POST request to update the status of the purchase with the given ID
    axiosClient.put(`/datapembelian/${id}`)
      .then(response => {
        // Update the riwayatPembelian state after successful status change
        const updatedRiwayatPembelian = riwayatPembelian.map(riwayat => {
          if (riwayat.id === id) {
            // Update the status of the specific purchase
            return { ...riwayat, status: 'Pembelian Berhasil' };
          }
          return riwayat;
        });
        setRiwayatPembelian(updatedRiwayatPembelian);
      })
      .catch(error => {
        console.error("Error updating status:", error);
      });
  };

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
            <th>Action</th>
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
              <td>
                {riwayat.status !== "Pembelian Berhasil" && (
                  <button className="btn bg-green-400" onClick={() => handleStatusChange(riwayat.id)}>
                    Konfirmasi <br/> Pembelian
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
