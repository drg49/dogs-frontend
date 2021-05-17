import React, {useEffect, useState} from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

  // URL in a variable
  const url = "http://localhost:4500"

  // State to hold the list of dogs
  const [dogs, setDogs] = useState([])

  // GET the dogs
  const getDogs = () => {
    fetch(url + "/dog/")
    .then((response) => response.json())
    .then((data) => {
      setDogs(data)
    })
  }

  useEffect(() => {getDogs()}, [])

  //handleCreate - function for when the create form is submitted
  const handleCreate = (newDog) => {
    fetch(url + "/dog/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDog)
    })
    .then(() => getDogs())
  }

  //handleUpdate - function for when the edit form is submitted
  const handleUpdate = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dog)
    })
    .then(() => getDogs())
  }

  //deleteDog to delete individual dogs
  const deleteDog = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "delete"
    })
    .then(() => {
      getDogs()
    })
  }

  // Empty Dog - For the Create Form
  const emptyDog = {
    name: "",
    age: 0,
    img: ""
  }

  const [selectedDog, setSelectedDog] = useState(emptyDog)
    
  //function to specify which dog we are updating
    const selectDog = (dog) => {
      setSelectedDog(dog)
    }

  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to="/create">
        <button>Add Dog</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => 
            <Display {...rp} dogs={dogs} selectDog={selectDog}  deleteDog={deleteDog} />} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
