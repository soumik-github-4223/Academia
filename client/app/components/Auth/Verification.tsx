import { useActivationMutation } from "@/redux/features/auth/authApi";
import { styles } from "../../../app/styles/style";;
import React, { FC, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import { useSelector } from "react-redux";

type Props = {
    setroute:(route:string)=>void;
}

type verifyNumber={
    "0":string;
    "1":string;
    "2":string;
    "3":string;
}
 
const Verification:FC<Props>=({setroute}) => {
    const {token}=useSelector((state:any)=>state.auth); // global state to get the token
    // console.log("Token is:",token);
     
    const [activation,{isSuccess,error}]=useActivationMutation(); // mutation to activate the user

    // console.log(useSelector((state: any) => state));
    // console.log("Redux state (auth):", useSelector((state: any) => state.auth));
    // console.log("Token from Redux state:", token);

    useEffect(()=>{
        if(isSuccess){
            toast.success("Account Activated Successfully");
            setroute("Login");
        }
        if(error){
            if("data" in error){
                const errorData = error as { data: { message: string } };
                toast.error(errorData.data.message);
                setInvalidError(true)
            } else{
                console.log("An error occured in verification:",error);
            }
        }
    },[isSuccess,error]);

    const [invalidError, setInvalidError] = useState(false);
    const inputRefs=[
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    const [verifyNumber, setVerifyNumber] = useState<verifyNumber>({
        0:"",
        1:"",
        2:"",
        3:""
    });

    const verificationHandler=async()=>{
        const verificationNumber=Object.values(verifyNumber).join(""); // converts the number to a single string
        if(verificationNumber.length<4){
            setInvalidError(true);
            return;
        }
        // console.log(token,verificationNumber);
        await activation({
            activation_token:token,
            activation_code:verificationNumber
        });
    }

    const handleInputChange=(index:number, value:string)=>{
        setInvalidError(false);
        const newVerifyNumber={...verifyNumber, [index]:value};
        setVerifyNumber(newVerifyNumber);
        
        if(value==="" && index>0){
            inputRefs[index-1].current?.focus();
        } else if(value.length===1 && index<3){
            inputRefs[index+1].current?.focus();
        }
    }

  return (
    <div>
        <h1 className={`${styles.title}`}>Verify Your Account</h1>
        <br />
        <div className="w-full flex items-center justify-center mt-2">
            <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center ">
                <VscWorkspaceTrusted size={40}/>
            </div>
        </div>
        <br /><br />
        <div className="m-auto flex items-center justify-around ">
            {
                Object.keys(verifyNumber).map((key,index)=>(
                    <input type="number"
                        key={key}
                        ref={inputRefs[index]}
                        className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-white justify-center text-[18px] font-Poppins outline-none text-center ${
                            invalidError ? "shake border-red-500" :
                            "border-white "
                        } `}
                        placeholder=""
                        maxLength={1}
                        value={verifyNumber[key as keyof verifyNumber]}
                        onChange={(e)=>handleInputChange(index,e.target.value)}
                    />
                ))
            }
        </div>
        <br /><br />

        <div className="w-full flex justify-center">
            <button className={`${styles.button}`}
                onClick={verificationHandler}
            >Verify OTP</button>
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Go back to Sign in ?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setroute("Login")}
          >
            Sign in
          </span>
        </h5>
    </div>
  )
}

export default Verification