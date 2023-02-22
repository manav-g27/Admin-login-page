require('dotenv').config({path:'./.env'})
const jwt =require('jsonwebtoken')
const Auth = async(req,res,next)=>{

    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer '))
    {
        return res.status(401).send('token not present')
    }
    const token = authHeader.split(' ')[1];
    try
    {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded.userName)
        req.userName = decoded.userName
        next()
    }
    catch(err)
    {
        return res.status(401).send('Token Expired, Please re-login')
    }

}

module.exports = Auth