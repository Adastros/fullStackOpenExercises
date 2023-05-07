const Searchbar = ({ onSearchbarFilter, onSearchbarChange }) => {
  return <input value={onSearchbarFilter} onChange={onSearchbarChange} />;
};

export default Searchbar;
