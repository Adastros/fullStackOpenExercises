import { useQueryClient, useMutation } from "react-query";
import anecdoteService from "../services/anecdote";
import { useNotificationDispatch } from "../notificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const createAnecdoteDispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(anecdoteService.create, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
    onError: (error) => {
      const notificationAction = {
        type: "MESSAGE",
        payload: error.response.data.error,
      };

      createAnecdoteDispatch(notificationAction);
      setTimeout(() => createAnecdoteDispatch({ type: "RESET" }), 5 * 1000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    newAnecdoteMutation.mutate(content);

    const notificationAction = {
      type: "MESSAGE",
      payload: `Created anecdote: "${content}"`,
    };

    createAnecdoteDispatch(notificationAction);
    setTimeout(() => createAnecdoteDispatch({ type: "RESET" }), 3 * 1000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
