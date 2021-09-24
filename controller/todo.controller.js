const TodoModel=require('../models/todo.model')

exports.create=async (req,res) =>{
    try {
        const {userName,title,category}=req.body
        const data={
            userName,
            title,
            taskDone:false,
            category,
        }
        const todoLists=await TodoModel.find();
        const found=todoLists.find(itme => itme.userName === userName)
        if(found){
           return res.status(400).json({
                message:"User name is already exist please use different username"
            })
        }
        const newTodoList=await TodoModel.create(data)
        return res.status(201).json({
            status:"Success",
            message:"Data saved successfully!",
            data:newTodoList
        });
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

exports.getAllList=async(req,res)=>{
    try {
        const todoLists=await TodoModel.find().sort({createdAt:1})
        return res.status(201).json({
            status:"Success",
            data:todoLists
        });
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

exports.getTodoById=async(req,res)=>{
    try {
        const {id}=req.params;
        const data=await TodoModel.findById(id)
        return res.status(201).json({
            status:"Success",
            data:data
        });
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

exports.updateById=async (req,res)=>{
    try {
        const {id}=req.params;
        const {userName,title,taskDone,category}=req.body;
        const todoLists=await TodoModel.find();
        const found=todoLists.find(itme => itme.userName === userName)
        if(found){
           return res.status(400).json({
                message:"userName already exists please choose different one"
            })
        }
        const data={userName,title,taskDone,category,updatedAt:new Date()}
     await TodoModel.findByIdAndUpdate(id,data,{runValidators:true})
        return res.status(201).json({
            status:"Success",
            message:"Data updated successfully!",
        });
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

exports.deleteById=async(req,res)=>{
   try {
    const {id}=req.params ;
    await TodoModel.findByIdAndDelete(id)
    return res.status(201).json({
        status:"Success",
        message:"Data deleted successfully!",
    });
   } catch (error) {
    res.status(400).json({
        message:error.message
    })
   }

}