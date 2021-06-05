const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get the token
  const token = req.header("Authorization");

  //check if token exists
  if (!token) {
    return res.status(401).json({ msg: "No token, Access denied" });
  }

  //decrypt the token
  try {
    jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (error) {
    console.log("middleware error");
    return res.status(500).json({ msg: "server error" });
  }
};
