import React,{useState} from "react";

function ToyForm({ handleAddToy }) {
  const [toyData, setToyData] = useState({
    name: "",
    image: "",
  })

  // define onSubmit handler
  const handleSubmit = event => {
    event.preventDefault()
    const newToy = {
      ...toyData,
      likes: 0
    }
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy)
    })
      .then(r => {
        if (!r.ok) { throw new Error("failed to create listing") }
        return r.json()
      })
      // use prop to add new listing to state and clear state
      .then(newToy => {
        handleAddToy(newToy)
        setToyData({
          name: "",
          image: "",
        });
      })
      .catch(error => console.log(error.message))
  };

  // define onChange handler
  const handleChange = event => {
    setToyData(previousData => ({
      ...previousData,
      [event.target.name]: event.target.value
    }))
  };

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={toyData.name}
          onChange={handleChange}/>
        <br />
        <input
          type="text"
          name={"image"}
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={toyData.image}
          onChange={handleChange}/>
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;

