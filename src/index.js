import React, { useState, useEffect } from 'react'
import {createRoot} from 'react-dom/client'
import Axios from 'axios'

// Top level App component.
function App() {
    // // Test json
    // const animals = [{name: "Meowsalot", species: "Cat"}, 
    //                  {name: "Barksalot", species: "Dog"}
    //                 ]
    const [animals, setAnimals] = useState([])    


    return (
        <div>
            <h1>Hello</h1>
            <p>Hey, from React...</p>
            {/* Creates new array */}
            {animals.map(function(animal) {
                return <AnimalCard name={animal.name} species={animal.species} />
            })}
        </div>
    )
}
// Component
function AnimalCard(props) {
    return <p>Hi, my name is {props.name} and I am a {props.species}</p>
}

const root = createRoot(document.querySelector("#app"))
root.render(<App />)