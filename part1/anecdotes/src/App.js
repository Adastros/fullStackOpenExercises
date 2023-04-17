import { useState } from "react";

function Button({ handleClick, text }) {
  return <button onClick={handleClick}>{text}</button>;
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [mostVotesIdx, setMostVotesIdx] = useState(0);

  const nextQuote = () => {
    let num = Math.floor(Math.random() * anecdotes.length);

    setSelected(num);
  };

  const incrementVote = () => {
    const currentPoints = [...points];

    currentPoints[selected] += 1;

    setPoints(currentPoints);
    setMostVotesIdx(determineMostVotes(currentPoints));
  };

  const determineMostVotes = (currentPoints) => {
    return currentPoints.findIndex((num) => num === Math.max(...currentPoints));
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>{`has ${points[selected]} votes`}</div>
      <Button handleClick={incrementVote} text="vote" />
      <Button handleClick={nextQuote} text="next anecdote" />
      <h1>Anecdote with the most votes</h1>
      <div>{anecdotes[mostVotesIdx]}</div>
      <div>{`has ${points[mostVotesIdx]} votes`}</div>
    </div>
  );
};

export default App;
