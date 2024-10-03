const jwt = require('jsonwebtoken')

const auth = (req,res,next) => { 
    const token = req.headers['authorization']

    if(!token){
        return res.status(400).json({
            "message":"No Token Provide please Check"
        })
    }

    jwt.verify(token,process.env.SECRETPASS,(err,decoded) => {
        
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        //to check user role 
        if(decoded.role !== 'user'){
            return res.status(403).json({'messsage':"forbidden errror"})
        }
        req.userId = decoded.userId
        req.role = decoded.role
        //give control to next middelware or route handler
        next()
    })

}

module.exports = auth