import { useSelector, useDispatch } from "react-redux";
import { updateFilterText } from "../reducers/filterReducer";

const AnecdoteFilter = () => {
  const filterText = useSelector((state) => state.filterText);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(updateFilterText(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filterText} />
    </div>
  );
};

export default AnecdoteFilter;
