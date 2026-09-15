import { useState } from 'react';

function Pagination({ items = [], itemsPerPage = 1 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = items.slice(firstIndex, lastIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {currentItems.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
      <br />
      <p>
        Page {currentPage} of {totalPages}
      </p>
      <br />
      <button onClick={() => paginate(1)} disabled={currentPage === 1}>
        First
      </button>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        onClick={() => paginate(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
