import  {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'


const HandleRefresh = () => {
  const nav = useNavigate();


  useEffect(() =>{
   const pageReload = () =>{
       nav('/')
   }
   window.addEventListener('load', pageReload);


   return () =>{
       window.removeEventListener('load', pageReload);
   }


   }, [nav])
 return null;
}


export default HandleRefresh