import './app.css'
import BasePage from "./pages/BasePage.tsx";
import React from "react";

export default function App() {
    const [index, setIndex] = React.useState(0);
    return <BasePage index={index} setIndex={setIndex}/>;
}
