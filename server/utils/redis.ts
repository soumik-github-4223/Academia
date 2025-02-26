import Redis from "ioredis";

require('dotenv').config(); //import dotenv

const redisurl=process.env.REDIS_URL || '';

const redisClient=()=>{
    if(redisurl){
        console.log("Redis connected")
        return redisurl;
    }
    throw new Error("Redis url not found")
}


export const redis=new Redis(redisClient());