function hsts(req, res, next){
    if(req.secure){

        res.setHeader(
            'strict-Transport-Security',
            'max-age=31536000; includeSubDomains; preload'
        )
    }
    next()
}
module.exports = hsts