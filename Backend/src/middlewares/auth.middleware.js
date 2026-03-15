const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  // Try to get token from cookie first, then from Authorization header
  let token = req.cookies.token;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7); // Remove "Bearer " prefix
    }
  }

  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist")
      return res.status(401).json("You dont have access");

    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Unauthorized" });
  }
}

module.exports = { authArtist };
