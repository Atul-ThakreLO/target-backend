import StudentServices from "../services/studentServices.js";
import ErrorHandler from "../helper/Error.js";
import { createError, deleteError } from "../helper/errorFunctions.js";
import jwt from "jsonwebtoken";

export const sendOTP = async (req, res, next) => {
  try {
    const response = await StudentServices.sendOTP(req.body);
    res.status(200).json(response);
  } catch (err) {
    deleteError(err, "Student", next);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const response = await StudentServices.verifyOTP(req.body);
    if (response === "verified") {
      res.status(200).json({ message: response });
    } else {
      res.status(400).json({ message: response });
      // throw new ErrorHandler( "OTP not verified", 400);
    }
  } catch (err) {
    deleteError(err, "Student", next);
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    if (req.tokenMeassage === "You are authenticated") {
      res
        .status(200)
        .json({ message: "Token verified", student_id: req.user.id });
    }
  } catch (err) {
    deleteError(err, "Student", next);
  }
};

export const createStudent = async (req, res, next) => {
  try {
    const { response, refreshToken, token } =
      await StudentServices.createStudent(req.body, req.file);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * (24 * 60 * 60 * 1000),
    });
    res.status(201).json({ message: response });
  } catch (err) {
    deleteError(err, "Student", next);
  }
};

export const loginStudent = async (req, res, next) => {
  try {
    const { response, refreshToken, token } =
      await StudentServices.loginStudent(req.body);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * (24 * 60 * 60 * 1000),
    });
    res.status(200).json({ response });
  } catch (err) {
    deleteError(err, "Student", next);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out" });
  } catch (err) {
    deleteError(err, "Student", next);
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const id = req.params.slug || req.user.id;
    const student = await StudentServices.getStudent(id, next);
    res.status(200).json(student);
  } catch (err) {
    deleteError(err, "Student", next);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    // console.log(req.query);
    const students = await StudentServices.getAllStudents(req.query);
    res.status(200).json(students);
  } catch (err) {
    deleteError(err, "Student", next);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const id = req.params.slug || req.user.id;
    const student = await StudentServices.deleteStudent(id, next);
    res.status(200).json(student);
  } catch (err) {
    deleteError(err, "Student", next);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const id = req.params.slug || req.user.id;
    const student = await StudentServices.updateStudent(req.body, id);
    res.status(200).json(student);
  } catch (err) {
    deleteError(err, "Student", next);
  }
};

export const updateProfilePicture = async (req, res, next) => {
  try {
    const file = req.file;
    const id = req.params.id;
    console.log(file);

    const response = await StudentServices.updateProfilePicture(id, file);
    res.status(200).json(response);
  } catch (err) {
    dispatchError(err, next, "Staff");
  }
};

export const getNotesByStudentId = async (req, res, next) => {
  try {
    const student = await StudentServices.getNotesByStudentId(
      req.user.id,
      next
    );
    res.status(200).json(student);
  } catch (err) {
    deleteError(err, "Student", next);
  }
};

export const getPapersByStudentId = async (req, res, next) => {
  try {
    const student = await StudentServices.getPapersByStudentId(
      req.user.id,
      next
    );
    res.status(200).json(student);
  } catch (err) {
    deleteError(err, "Student", next);
  }
};

export const getTestPapersByStudentId = async (req, res, next) => {
  try {
    const student = await StudentServices.getTestPapersByStudentId(
      req.user.id,
      next
    );
    res.status(200).json(student);
  } catch (err) {
    deleteError(err, "Student", next);
  }
};

// export const createStudentInfo = async (req, res, next) => {
//   try {
//     const student = await StudentServices.createStudentInfo(req.body);
//     res.status(201).json(student);
//   } catch (err) {
//     createError(err, "Student", next);
//   }
// };

// export const getStudentInfo = async (req, res, next) => {
//   try {
//     const student = await StudentServices.getStudentInfo(req.params.slug, next);
//     res.status(200).json(student);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getAllStudentsInfo = async (req, res, next) => {
//   try {
//     const students = await StudentServices.getAllStudentsInfo();
//     res.status(200).json(students);
//   } catch (err) {
//     next(err);
//   }
// };

// export const deleteStudentInfo = async (req, res, next) => {
//   try {
//     const student = await StudentServices.deleteStudentInfo(req.params.slug, next);
//     res.status(200).json(student);
//   } catch (err) {
//     deleteError(err, "Student", next);
//   }
// }

// export const updateStudentInfo = async (req, res, next) => {
//   try {
//     const student = await StudentServices.updateStudentInfo(req.params.slug, req.body, next);
//     res.status(200).json(student);
//   } catch (err) {
//     next(err);
//   }
// }
