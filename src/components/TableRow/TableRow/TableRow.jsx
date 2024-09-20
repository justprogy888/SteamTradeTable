import "./TableRow.scss"
import { useState,useEffect } from "react";
const TableRow = ({name,price,profit,sells,updateDate})=>{
    const [dateNow,setDateNow] = useState(0)
    const [showDate,setShowDate] = useState(false)
    
    useEffect(()=>{
        let date = Date.now()
        let parsedDate = Date.parse(updateDate)
        console.log(parsedDate)
        setDateNow(date - parsedDate)
        let id = setInterval(()=>{
            let date = Date.now()
            let parsedDate = Date.parse(updateDate)
            setDateNow(date - parsedDate)
        },1000)
        
        return ()=>clearInterval(id)
    },[])
    return(
        <div className="item-row" onDoubleClick={()=>{setShowDate(!showDate)}}>
            <div onClick={()=>navigator.clipboard.writeText(name)} className={!showDate ? "cell" : "cell hidden"}><p className="title">{name}</p></div>
            <div className={!showDate ? "cell" : "cell hidden"}><p>{price}</p></div>
            <div className={!showDate ? "cell" : "cell hidden"}><p>{profit.toFixed(2)}</p></div>
            <div className={!showDate ? "cell" : "cell hidden"}><p>{sells}</p></div>
            <div className={showDate ? "cell" : "cell hidden"}>Updated {new Date(dateNow).getMinutes()} minutes ago.</div>
        </div>
    );
}
export default TableRow