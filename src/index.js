import React, { useState, useEffect } from 'react'
import {createRoot} from 'react-dom/client'
import Axios from 'axios'
import CreateNewForm from './components/CreateNewForm'
import AnimalCard from './components/AnimalCard'

// Top level App component.
function App() {
    // // Test json
    // const animals = [{name: "Meowsalot", species: "Cat"}, 
    //                  {name: "Barksalot", species: "Dog"}
    //                 ]

    // State for animals json
    const [animals, setAnimals] = useState([])    

    // On initial page load or hard reload.
    useEffect(() => {
        async function go() {
            // http request to express server api.
            // Return json.
            const response = await Axios.get("/api/animals")
            // Change state.
            setAnimals(response.data)
        }
        go()
    }, [])


    return (
        <div className="container">
            {/* <h1>Hello</h1> */}
            <p>Hey, from React...</p>
            <p><a href="/">&laquo; Back to public homepage</a></p>
            <CreateNewForm setAnimals={setAnimals}/>
            {/* Creates new array */}
            <div className="animal-grid">
                {animals.map(function(animal) {
                    return <AnimalCard key={animal._id} name={animal.name} species={animal.species} photo={animal.photo} id={animal._id} setAnimals={setAnimals} />
                })}
            </div>
        </div>
    )
}
// // Component
// function AnimalCard(props) {
//     return <p>Hi, my name is {props.name} and I am a {props.species}</p>
// }

const root = createRoot(document.querySelector("#app"))
root.render(<App />)