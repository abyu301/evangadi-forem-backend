const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

// Define JWT secret key
const JWT_SECRET = "my_secret_key";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Authentication invalid" });
  }
  const token = authHeader.split(" ")[1];
  console.log("Received token:", token);

  try {
    // Verify the token using the JWT secret key
    const decodedToken = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decodedToken);
    const { username, userid } = decodedToken;
    req.user = { username, userid };
    console.log("Authenticated user:", req.user);
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error("Token expired:", error);
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.error("Invalid token:", error);
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid token" });
    } else {
      console.error("JWT verification error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
    }
  }
}

module.exports = authMiddleware;
