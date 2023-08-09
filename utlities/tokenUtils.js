import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyJWT = (token) => {
  //decode JWT token to original payload(userId: user._id, role: user.role )
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
