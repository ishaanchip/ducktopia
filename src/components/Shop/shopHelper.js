//images & icons
import ducktopiaCoin from "../../assets/coin.png"
import ducktopiaSkinTrickOrTreat from "../../assets/skin-trickortreat.png"
import ducktopiaSkinValedictorian from "../../assets/skin-valedictorian.png"
import ducktopiaKey from "../../assets/key.png"

//intercomponet imports


//external dependencies
import axios from "axios"


//gets users total coins
export const retrieveAccountStats = async(username) =>{
    try{
        const result = await axios.get(`${import.meta.env.VITE_API_URL}fetch-account_stats/${username}`)
        const coinsNow = result.data.result.account_stats.coins
        const skinsNow = result.data.result.account_stats.account_items.skins;
        const miscNow = result.data.result.account_stats.account_items.misc
        return {coinsNow:coinsNow, skinsNow:skinsNow, miscNow: miscNow};
        
        
    }
    catch(err){
        console.log(`there was an error in the frontend retrieving quiz data: ${err}`)
    }
}



//updates user total coins
export const updateTotalCoins = async(username, coinChange) =>{
    try{
        const postData = {username: username, coinChange:coinChange}
        const result = await axios.put(`${import.meta.env.VITE_API_URL}update-coin-amount`, postData)
        if (result.data.success === true){
            console.log('updated coin amount were a sucess!');
          }
          else{
            console.log('updated coin amount were NOT a sucess!');
          }
        
        
    }
    catch(err){
        console.log(`there was an error in the frontend sending coin change to backend: ${err}`)
    }
}

//updates user's cataloged items
export const updateAccountItems = async(username, item, itemType) =>{
    try{
        const postData = {username:username, addedItem:item, addedItemType:itemType}
        const result = await axios.put(`${import.meta.env.VITE_API_URL}update-account-items`, postData);
        if (result.data.success === true){
            console.log('updated account items  were a sucess!');
          }
          else{
            console.log('updated account items  were NOT a sucess!');
          }
    }
    catch(err){
        console.log(`there was an error in the frontend sending item change to backend: ${err}`)
    }
}



//TEMP DUCKTOPIA SHOP

export const ducktopiaShop = {
    skins:[
        {
            name:"Trick-or-Treater",
            cost:50000,
            img:ducktopiaSkinTrickOrTreat
        },
        {
            name:"Valedictorian",
            cost:100000,
            img:ducktopiaSkinValedictorian
        }
    ],
    misc:[
        {
            name:"Extra Credit Token",
            cost:1000000,
            img:ducktopiaKey
        },
        {
            name:"Extra Credit Token",
            cost:1000000,
            img:ducktopiaKey
        },
    ]
}