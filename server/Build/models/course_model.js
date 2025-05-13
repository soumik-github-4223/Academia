"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const reviewSchema = new mongoose_1.Schema({
    user: Object,
    rating: {
        type: Number,
        default: 0
    },
    review: String,
    commentReplies: [Object]
}, { timestamps: true });
const linkSchema = new mongoose_1.Schema({
    title: String,
    url: String
});
const commentSchema = new mongoose_1.Schema({
    user: Object,
    question: String,
    questionReplies: [Object]
}, { timestamps: true });
const courseDataSchema = new mongoose_1.Schema({
    videoUrl: String,
    title: String,
    videoSection: String,
    description: String,
    videoDuration: Number,
    videoPlayer: String,
    links: [linkSchema],
    suggestion: String,
    questions: [commentSchema],
});
const courseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    estimatedPrice: {
        type: Number
    },
    thumbnail: {
        public_id: {
            type: String,
            // required:true
        },
        url: {
            type: String,
            // required:true
        },
    },
    tags: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    demoUrl: {
        type: String,
        required: true
    },
    benifits: [{
            title: String
        }],
    prerequisites: [{
            title: String
        }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
        type: Number,
        default: 0
    },
    purchased: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
const CourseModel = mongoose_1.default.model("Course", courseSchema);
/*Work of above line
mongoose.model: This function is used to create a model in Mongoose. A model is a class with which we construct documents. In this case, the documents will be stored in a MongoDB collection.

"Course": This is the name of the collection in MongoDB. Mongoose will automatically look for the lowercase, plural form of this name. So, it will look for a collection named courses.

courseSchema: This is the schema definition for the Course collection. It defines the structure of the documents within the collection, including the fields and their types.

Model<ICourse>: This is a TypeScript type annotation. It specifies that CourseModel is a Mongoose model that works with documents conforming to the ICourse interface.

CourseModel: This is the constant that holds the created model. You can use this model to interact with the courses collection in MongoDB, such as creating, reading, updating, and deleting documents.

*/
exports.default = CourseModel;
