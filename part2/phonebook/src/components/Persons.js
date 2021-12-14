import React from "react";

function Persons({ filterContacts, handleDeletePerson }) {
  return (
    <div>
      {filterContacts.map((person, i) => (
        <div key={i}>
          {person.name} {person.number}
          <button onClick={() => handleDeletePerson(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default Persons;

