const Finance = require("../models/finance");
const User = require("../models/user");

exports.createExpense = async(req,res)=>{
    try{
        const {title,category,amount,date} = req.body;
        console.log(req.body);
        if(!title || !category || !amount){
            return res.status(500).json({
                success:false,
                message:"all field required"
            })
        }
        
        const {id} = req.existingUser;

        const response = await Finance.create({title,category,amount,date,user:id});

        await User.findByIdAndUpdate(id,
            {
                $push: {
                    expenses : response._id,
                },
            },
            {new:true,}
        );


        res.status(200).json({
            success:true,
            data:response,
            message:'Entry of Expense created successfully',
        })
    }
    catch(err){
        console.error("error is in create expense : ",err.message);
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}