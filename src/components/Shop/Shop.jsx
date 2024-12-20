import React, {useState} from 'react'
import "./Shop.css"

//images & icons
import ducktopiaCoin from "../../assets/coin.png"


//intercomponet imports
import LoadingBar from '../LoadingBar/Loading'
import { retrieveAccountStats,updateTotalCoins, ducktopiaShop, updateAccountItems } from './shopHelper'
import { useUser } from '../../context/UserContext'

//external dependencies
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const Shop = () => {
  
    //USER global state
        const {currentUser} = useUser();

    //retrieving user coin amount && user owned items   
        const [currentCoins, setCurrentCoins] = useState(0);
        const [ownedDucktopiaSkins, setOwnedDucktopiaSkins] = useState([]);
        const [ownedDucktopiaMisc, setOwnedDucktopiaMisc] = useState([]);
        const {isFetching:loadingAccountStats} = useQuery(
            {
                queryKey:['retrieving-account-stats'],
                queryFn: async()=> {
                    console.log("shop current user: " + currentUser)
                    const {coinsNow, skinsNow, miscNow} =  await retrieveAccountStats(currentUser)
                    setCurrentCoins(coinsNow)
                    setOwnedDucktopiaSkins(skinsNow)
                    setOwnedDucktopiaMisc(miscNow);
                    return coinsNow;
                }
            }
        )
    

        

    //handling item purchase
        const handleItemPurchase = async(username, itemCost, item, itemType) =>{
            if (currentCoins >= itemCost){
                console.log('sufficient funds...')
                if (itemType === "skins"){
                    setOwnedDucktopiaSkins((prev)=> [...prev, item])
                }
                else if (itemType === "misc"){
                    setOwnedDucktopiaMisc((prev)=> [...prev, item])
                }
                setCurrentCoins((prev) => prev - itemCost);
                await updateTotalCoins(username, -1*itemCost);
                await updateAccountItems(username, item, itemType)
            }
            else{
                console.log('insufficient funds...')
            }
        }
    
    //fetching and making items in shop useStates and checking current owned items
        const [ducktopiaSkins] = useState(ducktopiaShop.skins)
        const [ducktopiaMisc] = useState(ducktopiaShop.misc)


    //minimum loading time functionality when waiting for question
        const delay = (ms) => new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
        const [minLoading, setMinLoading] = useState(true)
        const minLoadingFunction = async() => {
        await delay(2500)
        setMinLoading(false)
        return true;
        }
        useQuery({
        queryKey:['minloading'],
        queryFn: async() => minLoadingFunction(),
        })

    if (minLoading || loadingAccountStats){
        return (
            <div className='ducktopia-shop-loading-backdrop'>
                <h1>ducktopia</h1>
                <LoadingBar />
                <p>Give us a sec...</p>
            </div>
        )
    }


  return (
    <div className='ducktopia-shop-backdrop'>

        <div className='ducktopia-shop-header'>
            <Link to="/" style={{textDecoration:'none', color:'black'}}><h1>ducktopia</h1></Link>
            <div className='ducktopia-coin-area'>
                <div className='ducktopia-coin'>
                    <img src={ducktopiaCoin} style={{width:'85px'}} alt='ducktopia-coin'/>
                </div>
                <p className='ducktopia-coin-count'>{currentCoins}</p>
            </div>
        </div>

        <div className='shop-shell'>
            <div className='shop-skin-area'>
                {
                    ducktopiaSkins.map((skin) =>(
                        <div className='skin-item' key={skin.name + " "  + Date.now()}>
                            <div className='skin-display'>
                                <h1>{skin.name}</h1>
                                <div className='skin-coin-area'>
                                    <div className='skin-coin'>
                                        <img src={ducktopiaCoin} style={{width:'85px'}} alt='skin-coin'/>
                                    </div>
                                    <p className='skin-coin-count'>{skin.cost}</p>
                                </div>
                                <img src={skin.img}/>
                            </div>
                            <div className='skin-purchase'>
                                {ownedDucktopiaSkins.includes(skin.name) 
                                    ? 
                                    <button>Owned</button>
                                    :
                                    <button onClick={()=> handleItemPurchase(currentUser,skin.cost, skin.name, "skins")}>Pre Order</button>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='shop-misc-area'>
                {ducktopiaMisc.map((misc, i) =>(
                    <div className='misc-item' key={misc.name + "-" + i   + Date.now()}>
                        <div className='misc-display'>
                            <h1>{misc.name}</h1>
                            <img src={misc.img} alt='ducktopia-key' style={{width:'120px'}}/>
                            <div className='misc-coin-area'>
                                <div className='misc-coin'>
                                    <img src={ducktopiaCoin} style={{width:'85px'}} alt='misc-coin'/>
                                </div>
                                <p className='misc-coin-count'>{misc.cost}</p>
                            </div>
                        </div>
                        <div className='misc-purchase'>
                            {ownedDucktopiaMisc.includes(misc.name) 
                                ? 
                                <button>Owned</button>
                                :
                                <button onClick={()=> handleItemPurchase(currentUser,misc.cost, misc.name, "misc")}>Pre Order</button>
                            }

                        </div>
                    </div>
                ))}
            </div>
        </div>

  </div>
  )
}

export default Shop