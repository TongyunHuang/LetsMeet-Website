module.exports.isAuth = (req, res, next) =>{
    if (req.isAuthenticated()){
        next()
    } else {
        res.status(401).json({
            meg: 'Please log in first'
        })
    }
}