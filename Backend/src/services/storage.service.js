import ImageKit  from "@imagekit/nodejs"
import { config } from "../config/config.js"



const client=new ImageKit({
    privateKey:config.IMAGEKIT_API_KEY
})


export const uploadFile= async({buffer,fileName,folder="Snitch"})=>{
    
    const result=await client.files.upload({
        file:await ImageKit.toFile(Buffer.from(buffer)),
        fileName, 
        folder
    })
    return result

}
