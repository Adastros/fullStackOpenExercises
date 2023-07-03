import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onAddNewAnecdote = async (e) => {
    e.preventDefault();

    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";

    dispatch(createNewAnecdote(anecdote));
    dispatch(setNotification(`Created anecdote "${anecdote}"`, 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onAddNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
