import jwt from "jsonwebtoken";

export function getAccessToken(
  data,
  secreteKey = process.env.JWT_SECRET,
  time = "1m"
) {
  console.log(data);
  return jwt.sign({ payload: data }, secreteKey, {
    expiresIn: time,
  });
}

export function getRefreshToken(
  data,
  secreteKey = process.env.JWT_REFRESH_SECRET,
  time = "5m"
) {
  // const payload = {id}
  return jwt.sign({ payload: data }, secreteKey, {
    expiresIn: time,
  });
}

// jwt.sign(student, process.env.JWT_SECRET, { expiresIn: "1m" }, (err, token) => {
//   if (err) {
//     throw new ErrorHandler("Token nahi bana", 500);
//   }
//   res.status(200).cookie("token", token, { httpOnly: true, secure: true }).json({ token});
// });
