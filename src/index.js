import React from 'react'
import {createRoot} from 'react-dom/client'

function App() {
    return (
        <div>
            <h1>Hello</h1>
            <p>Hey, from React...</p>
        </div>
    )
}

const root = createRoot(document.querySelector("#app"))
root.render(<App />)