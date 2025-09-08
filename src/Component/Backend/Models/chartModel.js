import mongoose from "mongoose";
const chartSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    students:{
        type:Number,
        required:true
    },
    employees:{
        type:Number,
        required:true
    }
});
export default mongoose.model("Chart",chartSchema);