import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  //onLoad list all toys
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


  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys} />
    </>
  );
}

export default App;

