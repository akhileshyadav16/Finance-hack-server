const jwt = require('jsonwebtoken');


exports.auth = async (req,res,next)=>{
    try{
        const token =  req.headers['authorization']?.replace('Bearer ', '');

        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is not found',
            })
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.existingUser = decode;

        }catch(error){
            return res.status(401).json({
                success:false,
                message:'Token is invalid'+error.message
            })
        }

        next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:'Token verification is failed:'+error.message
        })
    }
}