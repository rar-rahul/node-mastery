const User = require('../models/users')
const Post = require('../models/posts')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registration = async(req,res) => {
    const { name, email, mobile, password,role } = req.body;

    const uniqUser = await User.findOne({email:req.body.email})
    if(uniqUser){
        return res.status(301).json({
            "message":"User already exist"
        })
    }
  //hash the password
    const hashpass = await bcrypt.hash(password,10)

    const newUser = new User({name, email, mobile,password:hashpass,role})

    await newUser.save()

    const token = jwt.sign({userId:newUser._id},process.env.SECRETPASS)
    res.status(200).json({
        user:newUser,
        token
    })

    console.log(newUser)

}

const login = async(req,res) => {
    try{
        
    //find user in database
    const findUser = await User.findOne({email:req.body.email})

    console.log(findUser.password)

    //check password
    const isPasswordValid = await bcrypt.compare(req.body.password, findUser.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    //create token
    const token = jwt.sign({userId:findUser._id,role:findUser.role},process.env.SECRETPASS)

    res.status(200).json(token)

}catch(error){
    res.status(500).json({
        "message":error.message
    })
}
   
}

const profile = async (req,res) => { 
    
    try {
        const user = await User.findById(req.userId).populate('posts')
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);

    } catch (error) {
        res.status(401).json({
            "errror":"Something wrong"
        })
    }
   
    
}

const countPostByAuthor = async (req,res) => { 

            const data = await Post.aggregate([
                    {
                        $group:{
                            _id:'$author',
                            postCount:{$sum:1}
                        }
                    },
                    {
                        $lookup:{
                            from:'users',
                            localField: 'author',
                            foreignField: '_id',
                            as: 'authorDetails',
                        }
                    },
                    // {
                    //     $unwind: {
                    //         path: "$authorDetails",
                    //         preserveNullAndEmptyArrays: true // Keep posts without matching authors
                    //     }
                    // }
                    // {
                    //     $project: {
                    //         _id: 0, // Exclude the default _id field
                    //         author: '$authorDetails.name', // Include author's name
                    //         postCount: 1, // Include the count
                    //     },
                    // },


            ])

            res.status(200).json(data)
            console.log(data)
            console.log("testing counter aggregate")
}




module.exports = {registration,login,profile,countPostByAuthor}