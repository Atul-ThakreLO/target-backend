import jwt from "jsonwebtoken";
import { getAccessToken } from "../utils/jwtToken.js";
import ErrorHandler from "../helper/Error.js";

// export const isAuthenticated = (req, res, next) => {
//   try {
//     const { token } = req.cookies;
//     if (!token) {
//       throw new ErrorHandler("jwt expired", 500);
//       // return res.status(401).json({ error: "You are not authenticated blabal" });
//     }
//     const data = jwt.verify(token, process.env.JWT_SECRET);
//     // if (!data) {
//     //   return res.status(401).json({ error: "You are not authenticated" });
//     // }

//     req.user = data.payload;
//     req.tokenMeassage = "You are authenticated";
//   } catch (err) {
//     console.log(err);
//     const { refreshToken } = req.cookies;
//     try {
//       if (err.message === "jwt expired") {
//         const data = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//         if (!data) {
//           return res.status(400).json({ fail: "Something is went wrong" });
//         }
//         req.user = data.payload;
//         req.tokenMeassage = "You are authenticated";
//         console.log("refresh", req.user);
//         const token = getAccessToken(
//           { id: req.user.id, email: req.user.email },
//           process.env.JWT_SECRET,
//           "1d"
//         );
//         res.cookie("token", token, {
//           httpOnly: true,
//           secure: true,
//           sameSite: "strict",
//           maxAge: 24 * 60 * 60 * 1000,
//         });
//       }
//     } catch (err) {
//       // console.log(err);
//       throw err;
//     }
//   }
//   next();
// };

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token, refreshToken } = req.cookies;
    if (!token && !refreshToken) {
      throw new ErrorHandler("No access token provided");
    }
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data.payload;
      req.tokenMessage = "You are authenticated";
      return next();
    } catch (tokenError) {
      try {
        const refreshData = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET
        );

        const newToken = getAccessToken(
          { id: refreshData.payload.id, email: refreshData.payload.email },
          process.env.JWT_SECRET,
          "1d"
        );

        // Set new token in cookies
        // res.cookie("token", newToken, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === "production",
        //   sameSite: "strict",
        //   maxAge: 24 * 60 * 60 * 1000,
        // });
        res.cookie("token", newToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        });

        req.user = refreshData.payload;
        req.tokenMessage = "Token refreshed successfully";
        return next();
      } catch (refreshError) {
        throw new ErrorHandler("Invalid refresh token. Please log in again.");
      }
    }
  } catch (err) {
    next(err);
  }
};
