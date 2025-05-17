import PaperServices from "../../services/secondary/papersServices.js";
import ErrorHandler from "../../helper/Error.js";
import { createError } from "../../helper/errorFunctions.js";
import fs from "fs";
import dispatchError from "../../helper/dispatchError.js";

export const createPaper = async (req, res, next) => {
  try {
    const response = await PaperServices.createPaper(req.body, req.file, req.user.id);
    res.status(201).json(response);
    fs.unlinkSync(req.file.path);
  } catch (err) {
    fs.unlinkSync(req.file.path);
    console.log(err.name, err.code);
    createError(err, "Class", next);
  }
};

export const getAllPapers = async (req, res, next) => {
  try {
    const response = await PaperServices.getAllPapers(req.query);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getPaperById = async (req, res, next) => {
  try {
    const response = await PaperServices.getPaperById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const updatePaper = async (req, res, next) => {
  try {
    const response = await PaperServices.updatePaper(req.body);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const deletePaper = async (req, res, next) => {
  try {
    const response = await PaperServices.deletePaper(req.params.slug);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const deleteManyPapers = async (req, res, next) => {
  try {
    const response = await PaperServices.deleteManyPapers(
      req.body.ids,
      req.body.public_ids
    );
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getPapersForStudent = async (req, res, next) => {
  try {
    const response = await PaperServices.getPapersForStudent(
      req.query.class_id,
      req.user.id,
      req.query.subject_id,
      parseInt(req.query.session)
    );
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Notes");
  }
};
