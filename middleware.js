const {signUpUserSchema} = require('./joiSchemas')
const ExpressError = require('./utils/ExpressError')

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        return res.sendStatus(401)
    }
    next(); 
}

module.exports.validateUserInfo = (req,res,next) =>{
    const {error} = signUpUserSchema.validate(req.body)
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400) 
    }else{
        next()
    }
}
