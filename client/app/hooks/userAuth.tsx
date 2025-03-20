import { useSelector } from "react-redux";


export default function useUserAuth(){
    const {user}=useSelector((state:any)=>state.auth); // get user data from global state if its there

    if(user) return true;
    else return false;
}
