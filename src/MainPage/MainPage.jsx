import "./MainPage.scss"
import TableRow from "../components/TableRow/TableRow/TableRow";
import { useState, useEffect} from "react";
import Modal from "../components/Modal/Modal";
import arrowDown from "./down-arrow.svg"
import arrowUp from "./up-arrow.svg"
function MainPage() {
    const [key,setKey] = useState("")
    const [modalState,setModalState] = useState(localStorage.getItem('api_key') == undefined || localStorage.getItem('api_key') == "" ? true : false)
    const [priceMin,setPriceMin] = useState(localStorage.getItem("min_price"))
    const [priceMax,setPriceMax] = useState(localStorage.getItem("max_price"))
    const [salesMin,setSalesMin] = useState(localStorage.getItem("sales"))
    const [profitMin,setProfitMin] = useState(localStorage.getItem("min_profit_percent"))
    const [profitMax,setProfitMax] = useState(localStorage.getItem("max_profit_percent"))
    const [sortingOrderPrice,setSortingOrderPrice] = useState(2)
    const [sortingOrderSells,setSortingOrderSells] = useState(2)
    const [sortingOrderProfit,setSortingOrderProfit] = useState(2)
    const [isLoading, setIsLoading] = useState(false)
    const [sortId,setSortId] = useState(0)
    if(priceMin == undefined){
        setPriceMin(1.0)
        setPriceMax(10.0)
        setSalesMin(70.0)
        setProfitMin(5.0)
        setProfitMax(12.0)
    }
    const [fetchedItems,setFetchedItems] = useState()
    const [renderItems,setItems] = useState()
    async function getItem() {
        if (key != ""){
            setIsLoading(true)
            let resp = await fetch("https://www.steamwebapi.com/steam/api/items/?" + new URLSearchParams({
                key:key
            }).toString())
            
            let json = await resp.json()
            setFetchedItems([...json])
            setIsLoading(false)
        }
        else{
            setModalState(true)
        }
    }
    useEffect(()=>{
        if(fetchedItems != undefined){
            let renIt = fetchedItems.filter(el => {
                if(((el.buyorderprice >= priceMin) && (el.buyorderprice <= priceMax) && (((Number(el.pricelatest) - (Number(el.pricelatest) * 0.13)) - Number(el.buyorderprice)) >= ((el.pricelatest / 100) * profitMin )) && (((Number(el.pricelatest) - (Number(el.pricelatest) * 0.13)) - Number(el.buyorderprice)) <= ((el.pricelatest / 100) * profitMax )) && (el.sold7d >= salesMin))){
                    return true
                }else{
                    return false
                }
            })
            setItems([...renIt]) 
        }
        localStorage.setItem("min_price", priceMin)
        localStorage.setItem("max_price", priceMax)
        localStorage.setItem("sales", salesMin)
        localStorage.setItem("max_profit_percent", profitMax)
        localStorage.setItem("min_profit_percent", profitMin)
          
    },[profitMax,profitMin,salesMin,priceMax,priceMin,fetchedItems])
    useEffect(()=>{
        const id = setInterval(()=>{
            getItem()
        },1800000)
        getItem()
        return () => clearInterval(id)
    },[])
    useEffect(()=>{
        if(renderItems != undefined){
            if(sortId == 1){
                if(sortingOrderPrice == 0){
                    let dispItems = renderItems.sort((a,b)=>{ return b.buyorderprice - a.buyorderprice})
                    setItems([...dispItems])
                }else if(sortingOrderPrice == 1){
                    let dispItems = renderItems.sort((a,b)=>{ return a.buyorderprice - b.buyorderprice})
                    setItems([...dispItems])
                }
                
            }else if(sortId == 2){
                if(sortingOrderProfit == 0){
                    let dispItems = renderItems.sort((a,b)=>{ return ((Number(a.pricelatest) - (Number(a.pricelatest) * 0.13)) - Number(a.buyorderprice)) - ((Number(b.pricelatest) - (Number(b.pricelatest) * 0.13)) - Number(b.buyorderprice))})
                    setItems([...dispItems])
                }else if(sortingOrderProfit == 1){
                    let dispItems = renderItems.sort((a,b)=>{ return ((Number(b.pricelatest) - (Number(b.pricelatest) * 0.13)) - Number(b.buyorderprice)) - ((Number(a.pricelatest) - (Number(a.pricelatest) * 0.13)) - Number(a.buyorderprice))})
                    setItems([...dispItems])
                }
                
            }else if(sortId == 3){
                if(sortingOrderSells == 0){
                    let dispItems = renderItems.sort((a,b)=>{ return a.sold7d - b.sold7d})
                    setItems([...dispItems])
                }else{
                    let dispItems = renderItems.sort((a,b)=>{ return b.sold7d - a.sold7d})
                    setItems([...dispItems])
                }
                
            }
            
        }   
    },[sortingOrderPrice,sortingOrderProfit,sortingOrderSells,fetchedItems])
    const changeSortState = (id)=>{
        if(id == 1){
            if(sortingOrderPrice == 0){
                setSortingOrderPrice(1)
            }else if(sortingOrderPrice == 1){
                setSortingOrderPrice(2)
            }else{
                setSortingOrderPrice(0)
            }
            setSortingOrderProfit(2)
            setSortingOrderSells(2)
        }else if(id == 2){
            if(sortingOrderProfit == 0){
                setSortingOrderProfit(1)
            }else if(sortingOrderProfit == 1){
                setSortingOrderProfit(2)
            }else{
                setSortingOrderProfit(0)
            }
            setSortingOrderPrice(2)
            setSortingOrderSells(2)
        }else if(id == 3){
            if(sortingOrderSells == 0){
                setSortingOrderSells(1)
            }else if(sortingOrderSells == 1){
                setSortingOrderSells(2)
            }else{
                setSortingOrderSells(0)
            }
            setSortingOrderProfit(2)
            setSortingOrderPrice(2)
        }
        setSortId(id)
    }
    return (
        <div className="main-container">
            <Modal modalState={modalState} changeModalState={setModalState} changeApiKey={setKey}/>
            <p className="table-title">Steam Resell Table</p>
            <div className="cont-filters">
                <div className="filter-pair">
                    <p className="filter-title">Price min:</p>
                    <input className="filter-val" type="number" value={priceMin} onInput={e=>setPriceMin(e.target.value)}></input>
                </div>
                <div className="filter-pair">
                    <p className="filter-title">Price max:</p>
                    <input className="filter-val" type="number"  value={priceMax} onInput={e=>setPriceMax(e.target.value)}></input>
                </div>
                <div className="filter-pair">
                    <p className="filter-title">Sales min:</p>
                    <input className="filter-val" type="number"  value={salesMin} onInput={e=>setSalesMin(e.target.value)}></input>
                </div>
                <div className="filter-pair">
                    <p className="filter-title">Min profit %:</p>
                    <input className="filter-val" type="number"  value={profitMin} onInput={e=>setProfitMin(e.target.value)}></input>
                </div>
                <div className="filter-pair">
                    <p className="filter-title">Max profit %:</p>
                    <input className="filter-val" type="number" value={profitMax} onInput={e=>setProfitMax(e.target.value)}></input>
                </div>
            </div>
            <div className="refresh-settings-cont">
                <div className="settings">
                    <button className="button-refresh" onClick={getItem}>Refresh</button>
                    <div className="animation-cont">
                        <p className={isLoading ? "message animated" : "message hidden"}>Loading</p>
                    </div>
                </div>
            </div>
            <div className="table-cont">
                
                <div className="table">
                    <div className="row-head">
                        <div className="table-head-cont">
                            <p className="header-text-inner">Name</p>
                        </div>
                        <div className="table-head-cont" onClick={()=>changeSortState(1)}>
                            <p className="header-text-inner">Price</p>
                            <div className="sort-by-cont">
                                <img className={
                                    sortingOrderPrice == 1 || sortingOrderPrice == 2  ? "img-arrow" : "img-arrow arrow-hidden"} src={arrowUp}></img>
                                <img className={sortingOrderPrice == 0 || sortingOrderPrice == 2  ? "img-arrow" : "img-arrow arrow-hidden"} src={arrowDown}></img>
                            </div>
                        </div>
                        <div className="table-head-cont" onClick={()=>changeSortState(2)}><p className="header-text-inner">Profit</p>
                            <div className="sort-by-cont">
                                <img className={sortingOrderProfit == 1 || sortingOrderProfit == 2  ? "img-arrow" : "img-arrow arrow-hidden"} src={arrowUp}></img>
                                <img className={sortingOrderProfit == 0 || sortingOrderProfit == 2  ? "img-arrow" : "img-arrow arrow-hidden"} src={arrowDown}></img>
                            </div>
                        </div>
                        <div className="table-head-cont" onClick={()=>changeSortState(3)}>
                            <p className="header-text-inner">Sales</p>
                            <div className="sort-by-cont">
                                <img className={sortingOrderSells == 1 || sortingOrderSells == 2  ? "img-arrow" : "img-arrow arrow-hidden"} src={arrowUp}></img>
                                <img className={sortingOrderSells == 0 || sortingOrderSells == 2  ? "img-arrow" : "img-arrow arrow-hidden"} src={arrowDown}></img>
                            </div>
                        </div>

                    </div>
                        {
                            renderItems ? renderItems.map((el)=>{
                                return (
                                    <TableRow name={el.markethashname} price={el.buyorderprice} profit={((Number(el.pricelatest) - (Number(el.pricelatest) * 0.13)) - Number(el.buyorderprice))} sells={el.sold7d} updateDate={el.updatedat}/>
                                );
                            }): <p>No items</p>
                        }
                </div>
            </div>
        </div>
    );
  }

  export default MainPage;