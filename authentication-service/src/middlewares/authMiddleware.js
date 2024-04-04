const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const tokenFromHeaders = authHeader && authHeader.split(" ")[1];
  const tokenFromCookies = req.cookies.sessionToken;
  let token;
  if (!tokenFromHeaders && !tokenFromCookies) {
    return res.status(401).json({ error: "Unauthorized: Token not found" });
  }
  token = tokenFromHeaders || tokenFromCookies;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log({decoded})
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
