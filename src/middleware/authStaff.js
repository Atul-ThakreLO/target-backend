import jwt from "jsonwebtoken";
import { getAccessToken } from "../utils/jwtToken.js";
import ErrorHandler from "../helper/Error.js";

export const isStaffAuthenticated = (req, res, next) => {
  try {
    const { token, refreshToken } = req.cookies;
    if (!token && !refreshToken) {
      console.log(token, refreshToken);
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

export const isStaff = (req, res, next) => {
  try {
    const role = req.user.role;
    const isVerified = req.user.isVerified;
    if (role !== "TEACHER" || role !== "MANAGEMENT") {
      return res
        .status(401)
        .json({ error: "You are not authorized for this Page" });
    } else if (isVerified) {
      return res.status(401).json({ error: "You are not verified" });
    }
    next();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const isAdmin = (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin;
    if (isAdmin) {
      return res.status(401).json({ error: "This is not for you" });
    }
    next();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const verifyUUIDMiddleware = async (req, res, next) => {
  try {
    console.log("called middleware");
    const data = jwt.verify(req.body.uuid, process.env.JWT_EMAIL_SECRET);
    // console.log(data);
    if (!data) {
      return res.status(400).json({ error: "Something went wrong" });
    }
    next();
  } catch (err) {
    console.log(err);

    throw err;
  }
};

// export const isStaffAuthenticated = (req, res, next) => {
//   const { token } = req.cookies;
//   try {
//     // console.log("try blocked", token);
//     if (!token) {
//       throw new Error("jwt expired");
//       // return res.status(401).json({ error: "You are not authenticated" });
//     }
//     const data = jwt.verify(token, process.env.JWT_SECRET);
//     if (!data) {
//       return res.status(401).json({ error: "You are not authenticated" });
//     }
//     console.log(data.payload);

//     req.user = data.payload;
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
//         // console.log("refresh", req.user);
//         const token = getAccessToken(
//           {
//             id: req.user.id,
//             email: req.user.email,
//           },
//           process.env.JWT_SECRET,
//           "1d"
//         );
//         res.cookie("token", token, {
//           httpOnly: true,
//           secure: true,
//           sameSite: "strict",
//         });
//       }
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }
//   next();
// };

// const refreshData = jwt.verify(
//             refreshToken,
//             process.env.JWT_REFRESH_SECRET
//           );

//           // Generate new access token
//           const newToken = getAccessToken(
//             { id: refreshData.payload.id, email: refreshData.payload.email },
//             process.env.JWT_SECRET,
//             "1d"
//           );

//           // Set new token in cookies
//           res.cookie("token", newToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: 24 * 60 * 60 * 1000,
//           });

//           // Update request user and continue
//           req.user = refreshData.payload;
//           req.tokenMessage = "Token refreshed successfully";
