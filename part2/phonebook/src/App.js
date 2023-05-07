import { useState, useEffect } from "react";
import Persons from "./Persons.js";
import PersonForm from "./PersonForm.js";
import Filter from "./Filter.js";
import Notification from "./Notification.js";
import phonebookService from "./services/serverCom.js";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const notificationMessages = {
    add: `${newName} was successfully added`,
    update: `${newName}'s number was successfully updated`,
    delete: `${newName} was successfully deleted;`,
    error: `${newName} was already removed from the server`,
  };

  useEffect(() => {
    phonebookService
      .getAllFromServer()
      .then((initialResponse) => setPersons(initialResponse.data));
  }, []);

  const handleSubmit = (e) => {
    if (doesNameExist()) {
      if (confirmUpdateNumber()) {
        phonebookService
          .getAllFromServer()
          .then((response) =>
            phonebookService.putToServer(
              response.data.find((person) => person.name === newName),
              newNumber
            )
          )
          .then(updateNumbersList);

        setMessage(notificationMessages.update);
        setIsError(false);
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      phonebookService.postToServer(newPerson).then(updateNumbersList);
      setMessage(notificationMessages.add);
      setIsError(false);
    }

    setNewName("");
    setNewNumber("");
    clearNotification();
    e.preventDefault();
  };

  const doesNameExist = () => {
    let currentNames = persons.map((person) => person.name);

    return currentNames.includes(newName);
  };

  const confirmUpdateNumber = () => {
    return window.confirm(
      `${newName} already exists in the phonebook. Do you want to update the phone number?`
    );
  };

  const updateNumbersList = () => {
    phonebookService
      .getAllFromServer()
      .then((response) => setPersons(response.data));
  };

  const clearNotification = () => {
    setTimeout(() => setMessage(""), 5000);
  };

  const filterName = () => {
    if (newFilter) {
      return persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      );
    }

    return persons;
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  const handleClickDelete = (e) => {
    const personToDelete = JSON.parse(
      e.currentTarget.parentElement.dataset.personInfo
    );

    if (
      window.confirm(`Are you sure you want to delete ${personToDelete.name}`)
    ) {
      phonebookService
        .deleteFromServer(personToDelete.id)
        .then(updateNumbersList)
        .then(() => {
          setMessage(notificationMessages.delete);
          setIsError(false);
        })
        .catch(() => {
          setMessage(notificationMessages.error);
          setIsError(true);
          updateNumbersList();
        });

      clearNotification();
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a New</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filterName()} handleClickDelete={handleClickDelete} />
    </div>
  );
};

export default App;
