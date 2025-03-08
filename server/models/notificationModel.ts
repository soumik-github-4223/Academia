import mongoose, { Document, Model, Schema } from "mongoose";

export interface Inotification extends Document{
    title:string;
    message:string;
    status:string;
    userId:string;
}

const notificationSchema=new Schema<Inotification>({
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"unread"
    },
},{timestamps:true});


const NotificationModel:Model<Inotification>=mongoose.model('Notification',notificationSchema);

export default NotificationModel;