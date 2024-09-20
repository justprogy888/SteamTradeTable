import "./Modal.scss"
import { useState } from "react";
const Modal = ({modalState,changeModalState,changeApiKey})=>{
    const [keyVal,setKeyVal] = useState("")
    function save(){
        changeApiKey(keyVal)
        localStorage.setItem("api_key",keyVal)
        console.log(keyVal)
        console.log(modalState)
        changeModalState(false)
    }
    return(
        <div className={modalState ? "modal-background":"modal-background modal-closed"}>
            <div className="modal">
                <p className="modal-title">How to start?</p>
                <ol className="list">
                    <li className="listItem">Go to https://www.steamwebapi.com/</li>
                    <li className="listItem">Press Login with Steam and proceed</li>
                    <li className="listItem">Copy API key and insert here</li>
                </ol>
                <div className="container-input">
                    <input className="input-key" placeholder="Your api key" value={keyVal} onInput={(e)=>{setKeyVal(e.target.value)}}></input>
                    <button className="button-proceed" onClick={()=>{save()}}>Set</button>
                </div> 
            </div>
        </div>
    );
}
export default Modal