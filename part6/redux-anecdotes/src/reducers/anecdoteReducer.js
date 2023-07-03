import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

//// Without Redux Toolkit

// const getId = () => (100000 * Math.random()).toFixed(0);

// // helper
// const incrementVote = (state, id) => {
//   return state.map((anecdote) =>
//     anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
//   );
// };

// const addNewAnecdote = (state, newAnecdote) => {
//   return state.concat(newAnecdote);
// };

// const sortByVotesDescending = (state) => {
//   return state.toSorted((a, b) => b.votes - a.votes);
// };

// // action creators
// export const vote = (id) => {
//   console.log("vote", id);
//   return {
//     type: "VOTE",
//     payload: {
//       id,
//     },
//   };
// };

// export const createNewAnecdote = (anecdote) => {
//   return {
//     type: "NEW_ANECDOTE",
//     payload: {
//       content: anecdote,
//       id: getId(),
//       votes: 0,
//     },
//   };
// };

// // Reducer
// const anecdoteReducer = (state = initialState, action) => {
//   console.log("state now: ", state);
//   console.log("action", action);

//   let updatedState;

//   switch (action.type) {
//     case "VOTE": {
//       updatedState = incrementVote(state, action.payload.id);
//       break;
//     }

//     case "NEW_ANECDOTE": {
//       updatedState = addNewAnecdote(state, action.payload);
//       break;
//     }

//     default:
//       return state;
//   }

//   return sortByVotesDescending(updatedState);
// };

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    updateVoteUI(state, action) {
      const id = action.payload;

      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const { updateVoteUI, appendAnecdote, setAnecdote } =
  anecdoteSlice.actions;

// Action creators
export const initializeAnecdoteList = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdote(anecdotes));
  };
};

export const createNewAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(anecdote);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const incrementVote = (anecdoteObj) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVote(anecdoteObj);
    dispatch(updateVoteUI(updatedAnecdote.id));
  };
};

export default anecdoteSlice.reducer;
