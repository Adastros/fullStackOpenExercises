import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "react-query";
import anecdoteService from "./services/anecdote";
import { useNotificationDispatch } from "./notificationContext";

const App = () => {
  // React Query
  const queryClient = useQueryClient();
  const anecdoteVoteMutation = useMutation(anecdoteService.updateVote, {
    onSuccess: (updatedAnecdote) => {
      console.log("id: ", updatedAnecdote.id);
      console.log(updatedAnecdote);

      queryClient.setQueryData("anecdotes", (anecdotes) => {
        return anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        );
      });
    },
  });
  // React context and reducer
  const voteDispatch = useNotificationDispatch();

  const handleVote = (anecdote) => {
    const voteAction = {
      type: "MESSAGE",
      payload: `Voted for anecdote: "${anecdote.content}"`,
    };

    anecdoteVoteMutation.mutate(anecdote);
    voteDispatch(voteAction);
    setTimeout(() => voteDispatch({ type: "RESET" }), 3 * 1000);
  };

  const result = useQuery("anecdotes", () => anecdoteService.getAll());

  if (result.isLoading) {
    return <div>Loading Data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
