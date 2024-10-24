const jwt = require("jsonwebtoken");
const { env } = "dotenv";

const Auth = (req, res, next) => {
  const token = req.headers.token;
  const decode = jwt.verify(token, process.env.jwt_secrete);

  try {
    if (decode) {
      req.usedId = decode.id; // sending userid to next funtion from token data
      next();
    } else {
      res.status(403).json({
        message: "Incorrect credentials",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = Auth; // Use CommonJS export
