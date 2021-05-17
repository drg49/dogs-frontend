import React from "react";

const Display = (props) => {
  // destruct the dogs from props
  const { dogs } = props

  const loaded = () => {
    return  <div style={{textAlign: "center"}}>
      {dogs.map((dog) => {
        return (
          <article key={dog._id}>
            <img src={dog.img} />
            <h1>{dog.name}</h1>
            <h3>{dog.age}</h3>
            <button onClick={() => {
              props.selectDog(dog)
              props.history.push("/edit") //this just opens the /edit page (.history.push is literally a link, thats all it does, it opens a new)
            }}>Edit</button>
            <button onClick={() => {props.deleteDog(dog)}}>Delete</button>
          </article>
        )
      })}
    </div>
  }

  const loading = () => {
    return <h1>Loading</h1>
  }
  
  return dogs.length > 0 ? loaded() : loading()

};

export default Display;
