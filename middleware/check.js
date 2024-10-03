
//creating middelware for checking user
const checkUser = (req,res,next) => {
    console.log(req.method)
    if(req.method === "GET"){
        next()
    }else{
        console.log("giving rrror")
    }
}

module.exports = checkUser