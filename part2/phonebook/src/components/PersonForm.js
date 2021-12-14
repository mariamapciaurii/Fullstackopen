import React from "react";

const PersonForm = ({ addPerson, handleNewName, newName, handleNewNumber, newNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input onChange={handleNewName} value={newName} />
      </div>
      <div>
        Number: <input onChange={handleNewNumber} value={newNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;


