import React from "react";
const Filter = ({ handleFilter, filter }) => {
  return (
    <div>
      Filter shown with: <input onChange={handleFilter} value={filter} />
    </div>
  );
};

export default Filter;