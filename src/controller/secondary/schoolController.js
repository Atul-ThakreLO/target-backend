import SchoolServices from "../../services/secondary/schoolServices.js";
import { createError } from "../../helper/errorFunctions.js";
import dispatchError from "../../helper/dispatchError.js";

export const createSchool = async (req, res, next) => {
  try {
    const response = await SchoolServices.createSchool(req.body);
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "School");
  }
};

export const getAllSchools = async (req, res, next) => {
  try {
    const response = await SchoolServices.getAllSchooles();
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const setSchoolStatus = async (req, res, next) => {
  try {
    const response = await SchoolServices.setSchoolStatus(req.body);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, "School", next);
  }
};

export const getSchoolById = async (req, res, next) => {
  try {
    const response = await SchoolServices.getSchoolById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const updateSchool = async (req, res, next) => {
  try {
    console.log(req.body);
    const response = await SchoolServices.updateSchool(req.body);
    res.status(200).json(response);
    // res.status(200).json("Hello");
  } catch (err) {
    next(err);
  }
};

export const deleteSchool = async (req, res, next) => {
  try {
    const response = await SchoolServices.deleteSchool(req.params.slug);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
