import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-Client';

export default function Bangunrumah() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedType2, setSelectedType2] = useState(null);
  const [selectedType3, setSelectedType3] = useState(null);
  const [selectedType4, setSelectedType4] = useState(null);
  const [showForthSelector , setShowForthSelector] = useState(null);
  const [showSecondSelector, setShowSecondSelector] = useState(false);
  const [showThirdSelector, setShowThirdSelector] = useState(false);
  const [tampilanPilihanKedua, setPilihanKedua] = useState(false);
  const [selectedRumah, setSelectedRumah] = useState(null);
  const [materials, setMaterials] = useState([]);
  // ... other state variables

  useEffect(() => {
    if (selectedType) {
      // Make a GET request to your Laravel backend to fetch materials based on the selectedType
      axiosClient.get(`/api/bangunrumah`)
        .then(response => {
          setMaterials(response.data.materials);
        })
        .catch(error => {
          console.error('Error fetching materials:', error);
        });
    }
  }, [selectedType]); // Run this effect whenever selectedType changes


  const handleTypeSelection = (type) => {
    setSelectedType(type);
    setShowSecondSelector(true);
    setShowThirdSelector(false); // Reset the third set of values
    setPilihanKedua(false); // Reset the other set of values
    setSelectedRumah(false); // Reset the other set values
    setShowForthSelector(false);
  };

  const handlePilihanKedua = (type) => {
    setSelectedType2(type);
    setShowThirdSelector(false);
    setShowSecondSelector(false); // Reset the second set of values
    setPilihanKedua(true);
  };

  const handlePilihanKetiga = (type) => {
    setSelectedType3(type);
  };

  const handlPilihanKeempat = (type) => {
    setSelectedType4(type);
  };

  const handleRumahSelection = (rumah) => {
    setSelectedRumah(rumah);
  };

  return (
    <div>
      <div>Pilih Range Budget Anda </div>
      <div className="" style={{ marginLeft: '200px' }}>
        <div
          className="btn"
          style={{ backgroundColor: 'skyblue', marginLeft: '-50px' }}
          onClick={() => handleTypeSelection('10.000.000 - 25.000.000')}
        >
          10.000.000 - 25.000.000
        </div>
        <div
          className="btn"
          style={{ backgroundColor: 'cyan', marginLeft: '50px' }}
          onClick={() => handlePilihanKedua('25.000.000 - 50.000.000')}
        >
          25.000.000 - 50.000.000
        </div>
        <div className="btn" onClick={() => handleTypeSelection('  50.000.000 - 100.000.000')}>
          50.000.000 - 100.000.000
        </div>
        <div className="btn" onClick={() => handleTypeSelection('100.000.000 ->')}>
          100.000.000 --- 999.999.999
        </div>
      </div>

      {tampilanPilihanKedua && (
        <div>
  <div>
      Pilih Lokasi {selectedType2} {selectedRumah === null ? 'Pilih rumah' : selectedRumah}
    </div>
          <div className="">
            <div className="btn" onClick={() => handleRumahSelection('Minimalis' ,setShowThirdSelector(true))}>
              Minimalis
            </div>
            <div className="btn" onClick={() => handleRumahSelection('Industrial'  ,setShowThirdSelector(true))}>
              Industrial
            </div>
            <div className="btn" onClick={() => handleRumahSelection('Rumah Baji' ,setShowThirdSelector(true))}>
              Rumah Baji
            </div>
          </div>
        </div>
      )}

      {showSecondSelector && (
        <div>
          <div>Pilih Jenis Rumah dengan budget {selectedType} </div>
          <div className="">
            <div className="btn" onClick={() => handleRumahSelection('Rumah Kayu' ,setShowThirdSelector(true))}>
              Rumah Kayu
            </div>
            <div className="btn" onClick={() => handleRumahSelection('Rumah Minimalis' ,setShowThirdSelector(true))}>
              Rumah Minimalis
            </div>
            <div className="btn" onClick={() => handleRumahSelection('Rumah Mezzanine' ,setShowThirdSelector(true))}>
              Rumah Mezzanine
            </div>
          </div>
        </div>
      )}

      {showThirdSelector && (
        <div>
          <div>Pilih Lokasi Untuk {selectedType3} </div>
          <div className="">
          <div className="btn" onClick={() => handlePilihanKetiga('Rumah Pedalaman', setShowForthSelector(true))}>
              Pedalaman
            </div>
          <div className="btn" onClick={() => handlePilihanKetiga('Rumah Kota' , setShowForthSelector(true))}>
              Kota
            </div>
          <div className="btn" onClick={() => handlePilihanKetiga('Pesisir' , setShowForthSelector(true))}>
              Pesisir
            </div>
          </div>
        </div>
      )}

     {showForthSelector && (
        <div>
          <div> Pilih kriteria material pilihan </div>

          <div className=''>
            <select onChange={(e) => handlPilihanKeempat(e.target.value)}>
              <option value="">Contoh 1 </option>
              {selectedType && materials
                .filter(material => material.kategori === selectedType) // Filter materials based on selectedType
                .map(material => (
                  <option key={material.id} value={material.nama}>
                    {material.nama}
                  </option>
                ))}
            </select>
          </div>

          {/* <div className='btn' onClick={() => handlPilihanKeempat('Baja Ringan') }>
            Baja Ringan
          </div>
          <div className='btn' onClick={() => handlPilihanKeempat('') }>
            Baja Ringan
          </div>
          <div className='btn' onClick={() => handlPilihanKeempat('Baja Ringan') }>
            Baja Ringan
          </div>
          <div className='btn' onClick={() => handlPilihanKeempat('Baja Ringan') }>
            Baja Ringan
          </div> */}



        </div>



      )}


    </div>
  );
}
