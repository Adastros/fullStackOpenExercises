import { useSelector, useDispatch } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    console.log(state.anecdotes);
    const filteredStates = state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );

    const sortedStates = filteredStates.toSorted((a, b) => b.votes - a.votes);

    return sortedStates;
  });

  const dispatch = useDispatch();

  const handleClick = (anecdote) => {
    dispatch(incrementVote(anecdote));
    dispatch(setNotification(`Voted for "${anecdote.content}"`, 5));
  };

  console.log(anecdotes);

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
