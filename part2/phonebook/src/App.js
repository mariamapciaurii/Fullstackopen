import { useState, useEffect } from "react";
import "./index.css";

import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personService.getAll().then(personsData => setPersons(personsData));
  }, []);

  const handleNewName = e => setNewName(e.target.value);
  const handleNewNumber = e => setNewNumber(e.target.value);
  const handleFilter = e => setFilter(e.target.value);

  const filterContacts = filter === "" ? persons : persons.filter(x => x.name.toLowerCase().includes(filter));

  const handleDeletePerson = id => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      personService
        .remove(id)
        .then(res => {
          setSuccessMessage(`${persons.find(person => person.id === id).name} removed`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
          setPersons(persons.filter(person => person.id !== res));
        })
        .catch(error => {
          setErrorMessage(error);
        });
    }
  };

  const addPerson = e => {
    e.preventDefault();

    const newPersonObject = {
      name: newName,
      number: newNumber,
    };
    // Returns true if the element is in the array
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the new number with the new one?`)) {
        const id = persons.find(person => person.name === newName).id;
        personService
          .update(newPersonObject, id)
          .then(response => {
            setPersons(persons.map(person => (person.id !== id ? person : response)));
            setSuccessMessage(`${newName} was updated successfully`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            console.error(error.message);
            setErrorMessage(`${newName} was already removed from server`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          });
      }
    } else {
      personService
        .create(newPersonObject)
        .then(response => {
          setPersons(persons.concat(response));
          setSuccessMessage(`${newName} was added successfully`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
          setNewName("");
          setNewNumber("");
        })
        .catch(error => setErrorMessage(error));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter handleFilter={handleFilter} filter={filter} />
      <h3>Add a new Contact</h3>
      <PersonForm
        addPerson={addPerson}
        handleNewName={handleNewName}
        newName={newName}
        handleNewNumber={handleNewNumber}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons filterContacts={filterContacts} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;