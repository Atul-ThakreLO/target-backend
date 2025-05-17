import OffiseServices from "../services/offiseServices.js";
import { createError, deleteError } from "../helper/errorFunctions.js";
import jwt from "jsonwebtoken";
import dispatchError from "../helper/dispatchError.js";

export const createOffiseStaff = async (req, res, next) => {
  try {
    const staff = {
      email: req.body.email,
      password: req.body.password,
    };
    const info = {
      name: req.body.name,
      mobile: req.body.mobile,
      role: req.body.role,
      subjects: req.body.subjects,
      qualification: req.body.qualification,
    };

    const authToken = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(authToken, process.env.JWT_SECRET);

    const { response, refreshToken, token } =
      await OffiseServices.createOffiseStaff(
        { staff, info },
        data.payload,
        req.file
      );
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
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json(response);
  } catch (err) {
    dispatchError(err, next, "Staff");
  }
};

export const loginOffiseStaff = async (req, res, next) => {
  try {
    const { response, refreshToken, token } = await OffiseServices.loginStaff(
      req.body
    );
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
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

export const getStaff = async (req, res, next) => {
  try {
    const id = req.params.slug || req.user.id;
    const response = await OffiseServices.getStaff(id, next);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getAllStaff = async (req, res, next) => {
  try {
    if (req.query.isVerified) {
      req.query.isVerified = req.query.isVerified === "true" ? true : false;
    }
    // console.log(req.query);
    const response = await OffiseServices.getAllStaff(req.query);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Staff");
  }
};

export const deleteStaff = async (req, res, next) => {
  try {
    const id = req.params.slug || req.user.id;
    const response = await OffiseServices.deleteStaff(id, next);
    res.status(200).json(response);
  } catch (err) {
    deleteError(err, "Staff", next);
  }
};

export const updateStaff = async (req, res, next) => {
  try {
    // const id = req.params.slug || req.user.id || req.body.job_id;
    const info = {
      name: req.body.name,
      mobile: req.body.mobile,
      role: req.body.role,
      subjects: req.body.subjects,
      qualification: req.body.qualification,
    };
    const id = req.body.id;
    const response = await OffiseServices.updateStaff(id, info);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Staff");
  }
};

export const updateProfilePicture = async (req, res, next) => {
  try {
    const file = req.file;
    const id = req.params.id;
    const response = await OffiseServices.updateProfilePicture(id, file);
    res.status(200).json(response);
  } catch (err) {
    dispatchError(err, next, "Staff");
  }
};

export const verifyUUID = async (req, res, next) => {
  try {
    const data = jwt.verify(req.params.uuid, process.env.JWT_EMAIL_SECRET);
    // console.log(data);
    res.status(200).json(data.data);
  } catch (err) {
    next(err);
  }
};

export const verifyStaff = async (req, res, next) => {
  try {
    const response = await OffiseServices.verifyStaff(req.body);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const response = await OffiseServices.verifyAdmin(req.body);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getDashboardData = async (req, res, next) => {
  try {
    const response = await OffiseServices.getDashboardData();
    // console.log(response);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Dashboard");
  }
};
