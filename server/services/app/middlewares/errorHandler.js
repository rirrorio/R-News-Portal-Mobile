const errorhandler = async (err, req, res, next) => {
  switch (err.name) {
    case `Not found`:
      res.status(404).json({ message: "Data not found" });
      break;

    case "invalid email/password!":
      res.status(401).json({ message: "invalid email/password!" });
      break;

    case "forbidden":
      res.status(403).json({ message: "Forbidden access!" });
      break;

    case "token error":
    case "JsonWebTokenError":
      res.status(403).json({ message: "Token error" });
      break;

    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;

    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case `TokenExpiredError`:
      res.status(401).json({ message: `Token expired, please login again` });
      break;
    default:
      console.log(err);
      res.status(500).json({ message: "internal server error" });
      break;
  }
};

module.exports = errorhandler;
