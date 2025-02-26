import mongoose,{Document,Model,Schema} from "mongoose";

import bcrypt from "bcryptjs";

const emailRegexPattern:RegExp=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; // validating email


export interface Iuser extends Document{
    name:string;
    email: string;
    password:string;
    avatar: {
        public_id:string;
        url:string
    };
    role:string;
    isVerified:boolean;
    courses: Array<{courseId:string}>;
    comparePassword: (password:string)=> Promise<boolean>;

}


const userSchema: Schema<Iuser>=new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please enter your name"],
    },
    email:{
        type: String,
        required:[true,"Please enter your email"],
        validate:{
            validator: function (value:string){
                return emailRegexPattern.test(value);
            },
            message: "Please enter a valid email"
        },
        unique:true
    },
    password:{
        type:String,
        required: [true,"Please enter your password"],
        minlength:[6,"Password must be atleast 6 chatacters long"],
        select:false
    },
    avatar:{
        public_id: String,
        url: String       
    }, 
    role:{
        type:String,
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    courses:[ // The logic of using courses is that a user can have multiple courses, and we will fetch the courses of a user by using the courseId
        {courseId:String}
    ]

},{timestamps:true} );


// Hash user given password
userSchema.pre<Iuser>("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
    next();
});

//compare user password
userSchema.methods.comparePassword=async function(enteredPassword:string):Promise<boolean>{
    return await bcrypt.compare(enteredPassword,this.password);
};


export const userModel: Model<Iuser> =mongoose.model<Iuser>("User",userSchema); // create a model of userSchema

