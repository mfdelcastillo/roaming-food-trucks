

export default function priceList({resultPageState}){

    const onClick=(idx)=>{
        resultPageState.priceRating[idx] = !resultPageState.priceRating[idx]
    } 
    const clearPriceOption=()=>{
        resultPageState.priceRating = resultPageState.priceRating.map((element)=>{return false}) 
    }
    
    return(
    <div>
        {/* <button className='clearButton' onClick={clearPriceOption()}>Clear</button> */}
        <button className={`priceButton ${resultPageState.priceRating[0] ? 'selectedPrice': ''}`} onClick={onClick(0)}>$</button>
        <button className={`priceButton ${resultPageState.priceRating[1] ? 'selectedPrice': ''}`} onClick={onClick(1)}>$$</button>
        <button className={`priceButton ${resultPageState.priceRating[2] ? 'selectedPrice': ''}`} onClick={onClick(2)}>$$$</button>
        <button className={`priceButton ${resultPageState.priceRating[3] ? 'selectedPrice': ''}`} onClick={onClick(3)}>$$$$</button>
    </div>
    )}