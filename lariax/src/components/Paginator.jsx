import React from 'react';

export const Paginator = ({ currentPage, lastPage, onPageChange, prevText = '« Sebelumnya', nextText = 'Selanjutnya »' }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      onPageChange(newPage);
    }
  };

  return (
    <div
    className="join flex justify-center">
      <button
          style={{width:'300px'}}
        className="join-item btn btn-accent bg-teal-300 "
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {prevText}
      </button>
      <button
      className="join-item btn"
      style={{backgroundColor:'skyblue'}}
      disabled={true}
      >
        Halaman {currentPage}</button>
      <button
        style={{width:'300px'}}
        className="join-item btn btn-accent bg-teal-300 "
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        {nextText}
      </button>
    </div>
  );
};

export default Paginator;
