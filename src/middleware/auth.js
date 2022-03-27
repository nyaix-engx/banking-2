const jwt = require("jsonwebtoken");


const validateToken=(req, res, next)=>{
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) {
        return res.status(403).send({
          message: "No token provided!"
        });
      }
    jwt.verify(token, '1b1c58965376', (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        }
        console.log("decode",decoded)
        req.userId = decoded._id;
        next();
    });
}

module.exports=validateToken