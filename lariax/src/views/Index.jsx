import React from 'react';
import { useStateContext } from '../context/ContextProvider';
import Navbar from '../views/Navbar';
import axiosClient from '../axios-Client';
import '../../../resources/css/app.css';
import '../index.css';

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
          <label
            placeholder="Type something..."
            className="border p-2 w-full bg-orange-200 font-display"
            style={{width:'200px' , height:'200px'}}
          >
            <h1>asd</h1>
            <img src="ThomasLSaaty.jpg" className='flex items-center' alt="" />

          </label>
        </Card>

        <Card>
          <table className="w-full border-collapse border mt-4">
            <thead>
              <tr>
                <th className="border border-black text-left text-orange-300 p-2">ID</th>
                <th className="border border-black text-left text-orange-300 p-2">Nama</th>
              </tr>
            </thead>
          </table>
        </Card>
      </div>
    </div>
  );
}
