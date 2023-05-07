const DeleteButton = ({ handleClickDelete, person }) => {
  return (
    <button onClick={handleClickDelete}>
      Delete
    </button>
  );
};

export default DeleteButton;
