import ClassServices from "../../services/secondary/classServices.js";
import ErrorHandler from "../../helper/Error.js";
import { createError } from "../../helper/errorFunctions.js";
import dispatchError from "../../helper/dispatchError.js";

export const createClass = async (req, res, next) => {
  try {
    const response = await ClassServices.createClass(req.body);
    res.status(201).json(response);
  } catch (err) {
    console.log(err.name, err.code);
    createError(err, "Class", next);
  }
};

export const setClassStatus = async (req, res, next) => {
  try {
    const response = await ClassServices.setClassStatus(req.body);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, "School", next);
  }
};

export const getAllClasses = async (req, res, next) => {
  try {
    const response = await ClassServices.getAllClasses();
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getClassById = async (req, res, next) => {
  try {
    const response = await ClassServices.getClassById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const updateClass = async (req, res, next) => {
  try {
    const response = await ClassServices.updateClass(req.params.id, req.body);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

export const deleteClass = async (req, res, next) => {
  try {
    const response = await ClassServices.deleteClass(req.params.slug);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}