const jwt = require("jsonwebtoken");
const User = require("../model/user");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Unauthorized, user not found", success: false });
      }
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Unauthorized, invalid token", success: false });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized, no token", success: false });
  }
};

module.exports = protect;
