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

  const handleStatusChange = (id, material_id, nohp, namamaterial, quantity, alamat, namapembeli) => {
    // Convert 'nohp' to a string
    const phoneNumber = nohp.toString();

    // Make a request to update the status to "Berhasil Dibeli"
    axiosClient.put(`/konfirmasipembelian/${id}`, { status: 'Berhasil Dibeli', material_id, nohp: phoneNumber, namamaterial, quantity, alamat, namapembeli })
      .then(response => {
        // Handle success if needed
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
            <th>Action</th> {/* Add this header for the action column */}
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
              <td  >
                {/* Add a button to handle changing the status */}
                {riwayat.status !== "Selesai Berhasil Di Beli" && (
           <button className="btn bg-green-400" onClick={() => handleStatusChange(riwayat.id, riwayat.material_id,riwayat.nohp,riwayat.namamaterial,riwayat.quantity,riwayat.alamat,riwayat.namapembeli)}>
           Konfirmasi Pembelian
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
