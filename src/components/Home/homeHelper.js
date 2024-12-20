import axios from "axios";

//initializes ducktopia account
export const createDucktopiaAccount = async(username)=>{
    try{
        let postData = {username:username}
        const result = await axios.post(`${import.meta.env.VITE_API_URL}create-ducktopia-account`, postData)
        if (result.data.success === true){
            console.log('creating account was a sucess!');
          }
          else{
            console.log('creating account was NOT a success...');
          }
    }
    catch(err){
        console.log(`there was an error posting account data in frontend: ${err}`)
    }

    
}