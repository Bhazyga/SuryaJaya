import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-Client';


  const RI_VALUES = [0.00, 0.00, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49, 1.51, 1.48, 1.56, 1.57, 1.59];

export default function Bangunrumah() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedType2, setSelectedType2] = useState(null);
  const [selectedType3, setSelectedType3] = useState(null);
  const [showSecondSelector, setShowSecondSelector] = useState(false);
  const [showThirdSelector, setShowThirdSelector] = useState(false);
  const [tampilanPilihanKedua, setPilihanKedua] = useState(false);
  const [selectedRumah, setSelectedRumah] = useState(null);
  const [k1kiri, setk1kiri] = useState('');
  const [k1kanan, setk1kanan] = useState('');
  const [k2kiri, setk2kiri] = useState('');
  const [k2kanan, setk2kanan] = useState('');
  const [k3kanan, setk3kanan] = useState('');
  const [k3kiri, setk3kiri] = useState('');
  const [eigenValueMatrix, setEigenValueMatrix] = useState([]);
  const [totalEigenCalculated,setTotalEigenCalculated] = useState([]);
  const [averageEigenValues,setAverageEigenValues] = useState([]);
  const [eigenvalues,setEigenValues] = useState([]);
  const [CI,setCI] = useState([]);
  const [CR,setCR] = useState([]);
  const [lambdaMax,setLambdaMax] = useState([]);
  const [totalAverageEigenValues,setTotalAverageEigenValues] = useState([]);
  const [rankingValue,setRankingValue] = useState([]);
  const [showResults, setShowResults] = useState(false); // dibikin false dulu biar gak muncul kalo di munculin error die
  const [materials, setMaterials] = useState();

  const [kriteriaAverageValues, setKriteriaAverageValues] = useState([]);

useEffect(() => {
  if (averageEigenValues.length > 0) {
    const kriteriaAvgValues = averageEigenValues.slice(0, 3);
    setKriteriaAverageValues(kriteriaAvgValues);
  }
}, [averageEigenValues]);

const MATERIAL_CATEGORIES = ['batu', 'semen', 'genteng', 'fondasi', 'pasir'];

const recommendedMaterials = MATERIAL_CATEGORIES.map(category => {
  const filteredMaterials = materials && materials.filter(material => {
      return material.kategori === category && material.harga <= 950000;
  });
  return filteredMaterials && filteredMaterials.length > 0 ? filteredMaterials[0] : null;
});



  console.log(recommendedMaterials);

  const [ahpMatrix, setAhpMatrix] = useState([
    [1, k1kanan, k2kanan],
    [k1kiri, 1, k3kanan],
    [k2kiri, k3kiri, 1],
  ]);

  useEffect(() => {
    getMaterials();
  }, []);

  const getMaterials = () => {
    axiosClient
      .get(`/materials`)
      .then(({ data }) => {
        setMaterials(data.data);
      })
      .catch(() => {
      });
  };


  // Kalo Mau nambahin Sub Kriteria gas maifren
  // const [subAhpMatrix, setSubAhpMatrix] = useState([
  //   [1, 3,8],
  //   [0.333, 1, 3],
  //   [0.125,0.333, 1],
  // ]);

//   [1, k1kanan, k2kanan],
//   [k1kiri, 1, k3kanan],
//   [k2kiri, k3kiri, 1],
// ]);


  console.log(ahpMatrix);
 console.log(k1kiri);
 console.log(k1kanan);

 const handleTypeSelection = (type) => {

  setSelectedType(type);
  setShowSecondSelector(true);
  setShowThirdSelector(false); // Reset the third set of values
  setPilihanKedua(false); // Reset the other set of values
  setSelectedRumah(false);
};


const handlePilihanKedua = (type) => {
  setSelectedType2(type);
  setShowThirdSelector(false);
  setShowSecondSelector(false); // Reset the second set of values
  setPilihanKedua(true);
  setAhpMatrix([
    [1, k1kanan, k2kanan],
    [k1kiri, 1, k3kanan],
    [k2kiri, k3kiri, 1],
  ]);
};

const handlePilihanKetiga = (type) => {
  setSelectedType3(type);
  setAhpMatrix([
    [1, k1kanan, k2kanan],
    [k1kiri, 1, k3kanan],
    [k2kiri, k3kiri, 1],
  ]);
};


const handleRumahSelection = (rumah) => {
  setSelectedRumah(rumah);
};

function calculateEigenValueMatrix(matrix, eigenvalues) {
  const n = matrix.length; // Get the size of the matrix
  const eigenValueMatrix = [];

  // Iterate through each row in the matrix
  for (let i = 0; i < n; i++) {
    const row = [];
    const rowSum = eigenvalues[i]; // Get the corresponding eigenvalue for the row

    // Iterate through each element in the row
    for (let j = 0; j < n; j++) {
      // Calculate each element of the eigenvalue matrix by dividing the matrix element by the eigenvalue
      row.push(matrix[i][j] / rowSum);
    }
    eigenValueMatrix.push(row); // Push the row to the eigenvalue matrix
  }

  return eigenValueMatrix;
}

// AHP Calculation Logic
const calculateAhpWeights = () => {
  const n = ahpMatrix.length;

  // Step 1: Normalize the matrix
  const normalizedMatrix = ahpMatrix.map((row) =>
    row.map((cell) => (cell !== null ? cell : 1))
  );

  // Step 2: Calculate the weighted sum for each criterion
  const weightedSums = normalizedMatrix.map((row) =>
    row.reduce((sum, cell) => sum + cell, 0)
  );

  // Step 3: Calculate the eigenvalues
  const eigenvalues = weightedSums.map((sum, index) => sum / normalizedMatrix[index][index]);

  // Step 4: Calculate the Eigenvalue Matrix
  const eigenValueMatrix = calculateEigenValueMatrix(ahpMatrix, eigenvalues);
  console.log(eigenValueMatrix);

  const totalEigenCalculated = eigenValueMatrix[0].map((_, colIndex) =>
  eigenValueMatrix.reduce((total, row) => total + row[colIndex], 0)

);



// Step 5: Calculate the average value for each criterion
const averageEigenValues = totalEigenCalculated.map(sum => sum / n);

console.log('Total Rata rata',averageEigenValues)

// Step 4: Calculate the largest eigenvalue (lambda_max)
const lambdaMax = eigenvalues.reduce((total, val, index) => total + val * averageEigenValues[index] , 0);

 // Step 6: Calculate the Consistency Index (CI)
const CI = (lambdaMax - n) / (n - 1);

// Step 7: Look up the Random Index (RI)
const RI = RI_VALUES[2];

// Step 8: Calculate the Consistency Ratio (CR)
const CR = CI / RI;

  // Step 9: Log the results

  console.log('Total of each eigenvalue column:', totalEigenCalculated);
  console.log('Eigenvalues:', eigenvalues);
  console.log('Lambda Max:', lambdaMax);
  console.log('Consistency Index (CI):', CI);
  console.log('Random Index (RI):', RI);
  console.log('Consistency Ratio (CR):', CR);

  // Step 10: Check if the matrix is consistent
  if (CR <= 0.1) {
    console.log('The matrix is consistent.');
  } else {
    console.log('The matrix may not be consistent. Further adjustments may be needed.');
  }
  // Step 8: Check if the total of average eigenvalues is approximately 1
const totalAverageEigenValues = averageEigenValues.reduce((acc, val) => acc + val, 0);
const totalApproximatelyOne = Math.abs(totalAverageEigenValues - 1) < 0.0001;

console.log('Total of Average Eigenvalues:', totalAverageEigenValues);
console.log('Total Approximately Equal to One:', totalApproximatelyOne);


  const rankingValue = averageEigenValues.map(value => value / averageEigenValues.reduce((acc, val) => acc + val, 0));

  setTotalAverageEigenValues(totalAverageEigenValues);
  setEigenValueMatrix(eigenValueMatrix);
  setTotalEigenCalculated(totalEigenCalculated);
  setAverageEigenValues(averageEigenValues);
  setEigenValues(eigenvalues);
  setLambdaMax(lambdaMax);
  setCI(CI);
  setCR(CR);

  setRankingValue(rankingValue); // Set the ranking value in state
  console.log(eigenValueMatrix);
  console.log('Ranking Value (Priority Vector):', rankingValue);

};


  return (
    <>
    <>Pilih Range Budget Anda </>
  <div className="" >
    <div
      className="btn"

      onClick={() =>{ handleTypeSelection('10.000.000 - 25.000.000'); setk1kiri(5); setk1kanan(0.2);}}
    >
      10.000.000 - 25.000.000
    </div>
    <div
      className="btn"

      onClick={() => {handleTypeSelection('25.000.000 - 50.000.000'); setk1kiri(3); setk1kanan(0.33);}}
    >
      25.000.000 - 50.000.000
    </div>
    <div className="btn" onClick={() => {handlePilihanKedua('  50.000.000 - 100.000.000'); setk1kiri(0.33); setk1kanan(3);}}
    >
      50.000.000 - 100.000.000
    </div>
    <div className="btn" onClick={() => {handlePilihanKedua('100.000.000 ->'); setk1kiri(0.2); setk1kanan(5);}}
    >
      100.000.000 --- 999.999.999
    </div>
  </div>

  {tampilanPilihanKedua && (
    <>
      <>
        Pilih Jenis Rumah Dengan Budget {selectedType2} {selectedRumah === null ? 'Pilih rumah' : selectedRumah}
      </>
      <div className="">
        <div className="btn" onClick={() =>{ handleRumahSelection('Minimalis' ,setShowThirdSelector(true));  setk2kiri(5); setk2kanan(0.2)} }>
          Minimalis
        </div>
        <div className="btn" onClick={() => {handleRumahSelection('Mezzanine'  ,setShowThirdSelector(true));  setk2kiri(3); setk2kanan(0.33)}}>
          Mezzanine
        </div>
        <div className="btn" onClick={() =>{ handleRumahSelection('Industrial' ,setShowThirdSelector(true));  setk2kiri(0.33); setk2kanan(3)}}>
          Industrial
        </div>
        <div className="btn" onClick={() =>{ handleRumahSelection('Modern' ,setShowThirdSelector(true));  setk2kiri(0.2); setk2kanan(5)}}>
          Modern
        </div>
      </div>
    </>
  )}

  {showSecondSelector && (
  <>
  <>Pilih Jenis Rumah Dengan Budget {selectedType} </>
      <div className="">
        <div className="btn" onClick={() => {handleRumahSelection('Rumah Kayu' ,setShowThirdSelector(true));  setk2kiri(5); setk2kanan(0.2)}}>
          Rumah Kayu
        </div>
        <div className="btn" onClick={() => {handleRumahSelection('Rumah Minimalis' ,setShowThirdSelector(true));  setk2kiri(3); setk2kanan(0.33)}}>
          Rumah Minimalis
        </div>
        <div className="btn" onClick={() => {handleRumahSelection('Rumah Mezzanine' ,setShowThirdSelector(true)); setk2kiri(0.33); setk2kanan(3)}}>
          Rumah Mezzanine
        </div>
        <div className="btn" onClick={() => {handleRumahSelection('Rumah Industrial' ,setShowThirdSelector(true)); setk2kiri(0.2); setk2kanan(5)}}>
          Rumah Modern
        </div>
      </div>
  </>
  )}

  {showThirdSelector && (
    <>
    <>Pilih Kualitas Material </>
      <div className="">
        <div className="btn" onClick={() => {handlePilihanKetiga('Rendah'); setk3kiri(5); setk3kanan(0.2)}}>
          Rendah
        </div>
        <div className="btn" onClick={() => {handlePilihanKetiga('Menengah' ); setk3kiri(3); setk3kanan(0.33)}}>
          Menengah
        </div>
        <div className="btn" onClick={() => {handlePilihanKetiga('Bagus'); setk3kiri(0.33); setk3kanan(3)}}>
          Bagus
        </div>
        <div className="btn" onClick={() => {handlePilihanKetiga('Tinggi' ); setk3kiri(0.2); setk3kanan(5)}}>
          Tinggi
            </div>
          </div>
    </>
      )}


       {/* Display AHP Matrix */}
       <>

  <table>

  <thead>
    <tr>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th>Pembagian Eigen</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <thead>
    <tr>
      <th style={{color:'firebrick'}}>Kriteria</th>
      <th>Budget</th>
      <th>Tipe Bangunan</th>
      <th>Kualitas</th>
      <th>Jumlah Matriks</th>
      <th>Budget</th>
      <th>Tipe Bangunan</th>
      <th>Kualitas</th>
      <th>Jumlah Eigen</th>
      <th>Rata Rata</th>
    </tr>
  </thead>
    <tbody>
    {ahpMatrix.map((row, rowIndex) => (
  <tr key={rowIndex}>
    <td>{rowIndex === 0 ? 'Budget' : rowIndex === 1 ? 'Tipe Bangunan' : rowIndex === 2 ? 'Kualitas' : 'EigenValue' }</td>
    {row.map((cell, colIndex) => (
      <td key={colIndex}>{cell}</td>
    ))}
    {showResults && (

<>
<td>{eigenvalues[rowIndex]}</td>

    {eigenValueMatrix[rowIndex].map((value, colIndex) => (
      <td key={`eigenValueCell-${rowIndex}-${colIndex}`}>{value}</td>
    ))}


   <td>{totalEigenCalculated[rowIndex]}</td>
   <td>{averageEigenValues[rowIndex]}</td>
</>
    )}
  </tr>
))}
    </tbody>
  </table>
  {/* table Kedua maifren */}
  <table>
  <thead>
      <tr>
      <th></th>
        <th>Lambda Max</th>
        <th>Indeks Konsistensi</th>
        <th>Rasio Konsistensi</th>
        <th></th>
        <th></th>
        <th></th>
        <th>Kalkulasi dinyatakan benar jika</th>
        <th>Jumlah Rata Rata</th>
      </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td>{lambdaMax}</td>
      <td>{CI}</td>
      <td>{CR}</td>
      <td></td>
      <td></td>
      <td></td>
      <td>Jika total jumlah rata rata = 1 </td>
      <td>{totalAverageEigenValues}</td>
    </tr>
  </tbody>
</table>
</>
          {/* AHP Button di pencet baru result eigen pada muncul */}
          <div
          className='btn bg-orange-200'
          style={{color:'black'}}

          >
          <button
  className='btn bg-orange-300'
  disabled={ahpMatrix.flat().some(value => value === '')}
  onClick={() => {calculateAhpWeights(); setShowResults(true);}}
  style={{color:'black'}}
>
  {ahpMatrix.flat().some(value => value === '') ? 'Silahkan pilih tombol di atas sebelum melakukan perhitungan' : 'Kalkulasi Bobot AHP'}
</button>
</div>
<table>
        <thead>
          <tr>
            <th></th>
            <th>Budget</th>
            <th>Tipe Bangunan</th>
            <th>Kualitas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Average Value</td>
            {kriteriaAverageValues.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        </tbody>
      </table>

      {showResults && (
    <div className="recommended-materials">
        <table>
            <thead>
                <tr>
                    <th>Kategori</th>
                    <th>Material</th>
                    <th>Harga</th>
                </tr>
            </thead>
            <tbody>
                {recommendedMaterials.map((material, index) => (
                    <tr key={index}>
                        <td>{MATERIAL_CATEGORIES[index]}</td>
                        <td>
                            {material ? (
                                <div>
                                    <p>{material.nama}</p>
                                </div>
                            ) : (
                                <p>Material Yang Anda Cari Tidak Ada Yang Cocok Dengan Bobot AHP</p>
                            )}
                        </td>

                        <td>{material ? material.harga : "-"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}

    </>
  );
}
