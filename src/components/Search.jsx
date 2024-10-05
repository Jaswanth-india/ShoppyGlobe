import "./Search.css"
import { useContext } from "react";
import userInputContext from "../utils/userInput.js";

function Search(){
    const {setUserInput} = useContext(userInputContext);
    function handleInputChange(e){
        setUserInput(e.target.value);
    }
    return(
        <>
            <section id="inputSection">
                <input type="text" onChange={(e)=>{handleInputChange(e)}} placeholder="Filter By Search"/>
            </section>
            <hr/>
        </>
    )
}

export default Search;