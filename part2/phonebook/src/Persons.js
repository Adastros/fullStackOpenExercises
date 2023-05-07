import DeleteButton from "./DeleteButton.js";

const Persons = ({ persons, handleClickDelete }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          // data-* attributes are implicitly converted to strings.
          // Must convert objects too strings and then parse them back to 
          // objects to properly handle data.
          <li
            key={`${person.name}_${person.id}`}
            data-person-info={JSON.stringify(person)}
          >
            {person.name} {person.number}
            <DeleteButton handleClickDelete={handleClickDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
