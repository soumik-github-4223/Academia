import mongoose, { Document, Model, Schema } from "mongoose";
import { Iuser } from "./user_model";


interface IComment extends Document{
    user:Iuser;
    question:string;
    questionReplies?: IComment[];
}

interface IReview extends Document{
    user:Iuser;
    rating: number;
    review:string;
    commentReplies?: IComment[];
}

interface ILink extends Document{
    title:string;
    url:string;
}

interface ICourseData extends Document{
    title:string;
    description:string;
    videoUrl:string;
    videoThumbnail:object;
    videoSection:string;
    videoDuration:number;
    videoPlayer:string;
    links:ILink[];
    suggestion:string;
    questions:IComment[];
}

interface ICourse extends Document{
    name:string;
    description:string;
    price:number;
    estimatedPrice?:number;
    thumbnail:object;
    tags:string;
    level:string;
    demoUrl:string;
    benifits:{title:string}[];
    prerequisites:{title:string}[];
    reviews: IReview[];
    courseData: ICourseData[];
    ratings?:number;
    purchased?:number;
}

const reviewSchema=new Schema<IReview>({
    user:Object,
    rating:{
        type:Number,
        default:0
    },
    review:String,
    commentReplies: [Object]
}, {timestamps:true});

const linkSchema=new Schema<ILink>({
    title:String,
    url:String
});

const commentSchema=new Schema<IComment>({
    user:Object,
    question:String,
    questionReplies:[Object]
}, {timestamps:true});

const courseDataSchema=new Schema<ICourseData>({
    videoUrl:String,
    title:String,
    videoSection:String,
    description:String,
    videoDuration:Number,
    videoPlayer:String,
    links:[linkSchema],
    suggestion:String,
    questions:[commentSchema],
})

const courseSchema=new Schema<ICourse>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true  
    },
    price:{
        type:Number,
        required:true
    },
    estimatedPrice:{
        type:Number
    },
    thumbnail:{
        public_id:{
            type:String,
            // required:true
        },
        url:{
            type:String,
            // required:true
        },
    },
    tags:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    demoUrl:{
        type:String,
        required:true
    },
    benifits:[{
        title:String
    }],
    prerequisites:[{
        title:String
    }],
    reviews: [reviewSchema],

    courseData:[courseDataSchema],
    ratings:{
        type:Number,
        default:0
    },
    purchased:{
        type:Number,
        default:0
    }

},{timestamps:true});

const CourseModel: Model<ICourse> = mongoose.model("Course",courseSchema);
/*Work of above line 
mongoose.model: This function is used to create a model in Mongoose. A model is a class with which we construct documents. In this case, the documents will be stored in a MongoDB collection.

"Course": This is the name of the collection in MongoDB. Mongoose will automatically look for the lowercase, plural form of this name. So, it will look for a collection named courses.

courseSchema: This is the schema definition for the Course collection. It defines the structure of the documents within the collection, including the fields and their types.

Model<ICourse>: This is a TypeScript type annotation. It specifies that CourseModel is a Mongoose model that works with documents conforming to the ICourse interface.

CourseModel: This is the constant that holds the created model. You can use this model to interact with the courses collection in MongoDB, such as creating, reading, updating, and deleting documents.

*/

export default CourseModel;