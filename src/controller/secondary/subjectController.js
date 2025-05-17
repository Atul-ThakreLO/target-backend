import SubjectServices from "../../services/secondary/subjectServises.js";
import { createError } from "../../helper/errorFunctions.js";
import dispatchError from "../../helper/dispatchError.js";

export const createSubject = async (req, res, next) => {
  try {
    const response = await SubjectServices.createSubject(req.body);
    res.status(201).json(response);
  } catch (err) {
    console.log(err.name, err.code);
    createError(err, "Class", next);
  }
};

export const setSubjectStatus = async (req, res, next) => {
  try {
    const response = await SubjectServices.setSubjectStatus(req.body);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, "Subject", next);
  }
};

export const getAllSubject = async (req, res, next) => {
  try {
    const response = await SubjectServices.getAllSubject();
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getAllSubjectByClass = async (req, res, next) => {
  try {
    const response = await SubjectServices.getAllSubjectByClass(
      req.query.class_id
    );
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getAllSubjectsGroupByClass = async (req, res, next) => {
  try {
    const response = await SubjectServices.getAllSubjectsGroupByClass();
    res.status(200).json(response);
  } catch (err) {
    dispatchError(err, next, "Subject");
  }
};

export const getSubjectById = async (req, res, next) => {
  try {
    const response = await SubjectServices.getSubjectById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const updateSubject = async (req, res, next) => {
  try {
    const response = await SubjectServices.updateSubject(
      req.params.id,
      req.body
    );
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const deleteSubject = async (req, res, next) => {
  try {
    const response = await SubjectServices.deleteSubject(req.params.slug);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
