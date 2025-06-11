import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  //OnLoad list all toys
  useEffect(() => {
    const fetchToys = async () => {
      try {
        const response = await fetch("http://localhost:3001/toys");
        if (response.ok) {
          const toys = await response.json();
          setToys(toys);
        } else {
          console.log("Fetch request failed");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchToys();
  }, []);

  //Add Toy
  function handleAddClick() {
    setShowForm((showForm) => !showForm);
  }

  const handleAddToy = newToy => setToys(previousToys => [...previousToys, newToy])

  //Delete Toy
  const handleDeleteToy = deletedToyId => setToys(previousToys => previousToys.filter(toy => toy.id !== deletedToyId))

  //Update toy likes
  function handleUpdateToy(updatedToy) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );
    setToys(updatedToys);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm handleAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleAddClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy} />
    </>
  );
}

export default App;


