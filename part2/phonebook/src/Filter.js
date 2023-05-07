const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter Phonebook for:{" "}
      <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
