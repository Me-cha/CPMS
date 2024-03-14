const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "JWT must be provided" });
    }

    const token = authHeader.split(" ")[1];
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const { email, phone, id } = decodedData;
    req.user = { email, phone, id };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid JWT" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = auth;
