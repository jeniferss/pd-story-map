import './app.css'
import BasePage from "./pages/Base/index.tsx";
import React from "react";
import GreetPage from "./pages/Greet";

export default function App() {
    const [index, setIndex] = React.useState(0);
    const [start, setStart] = React.useState(false);

    if (start) {
        return <BasePage index={index} setIndex={setIndex}/>;
    } else {
        return <GreetPage setStart={setStart}/>
    }
}
