import jwt from "jsonwebtoken";

export function auth (req,res,next) {
  const token = req.headers.token;
  if(!token){
    return res.status(401).json({message:'Token is required'});
  }
  try {
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.userId = decodedData.id;
    next();
  } catch (error) {
    return res.status(401).json({message:'Inavlid or expired token'});
  }
}