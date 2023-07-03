import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const create = async (anecdote) => {
  const newAnecdote = {
    content: anecdote,
    votes: 0,
  };

  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const updateVote = async (anecdoteObj) => {
  const updatedAnecdote = {
    ...anecdoteObj,
    votes: anecdoteObj.votes + 1,
  };

  const response = await axios.put(
    `${baseUrl}/${updatedAnecdote.id}`,
    updatedAnecdote
  );

  return response.data;
};

const anecdoteService = { getAll, create, updateVote };

export default anecdoteService;
