import React from 'react';
import { useStateContext } from '../context/ContextProvider';
import Navbar from '../views/Navbar';
import axiosClient from '../axios-Client';
import '../../../resources/css/app.css';
import '../index.css';
import { Link } from 'react-router-dom';

const Card = ({ children }) => (
  <div className="bg-accent-200 rounded-lg shadow-md p-4 mt-4">
    {children}
  </div>
);

export default function Index() {
  return (
    <div>
      <Navbar />
      <div className="bg-orange-200" style={{ backgroundColor: '#00023' }}></div>
      <img src="rumahnenekks.jpg" alt="" style={{ width: '100%', height:'120%', zIndex: -1, position: 'absolute' }} />

      <div className="mt-8 ml-10" style={{position:'absolute' , marginTop:'220px'}}>
      <Card>
    <div className="p-6 bg-yellow-200 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">Selamat Datang Di Website Toko Bangunan Surya Jaya</h1>

        <p className="text-lg text-center mb-6">Temukan kebutuhan bangunan Anda dengan harga terbaik!</p>
        <div className="border p-4 bg-orange-200 font-display rounded-lg">

          <button>
          <Link to="/bangunrumah">
            <label  className="btn  bg-orange-100 block text-center">Temukan Material Yang Anda Butuhkan Untuk Bangunan Rumah Dengan Metode AHP Kami </label>
            </Link>
            </button>
        </div>
    </div>
</Card>


      </div>
    </div>
  );
}
