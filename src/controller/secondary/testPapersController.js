import TestPaperServices from "../../services/secondary/testPaperServices.js";
import { createError } from "../../helper/errorFunctions.js";
import dispatchError from "../../helper/dispatchError.js";

export const createTestPaper = async (req, res, next) => {
  try {
    const response = await TestPaperServices.createTestPaper(
      req.body,
      req.user.id
    );
    res.status(201).json(response);
  } catch (err) {
    console.log(err.name, err.code);
    createError(err, "Class", next);
  }
};

export const addTotalMarks = async (req, res, next) => {
  try {
    const response = await TestPaperServices.addTotalMarks(req.body);
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, "Total Marks", next);
  }
};

export const getAllTestPaperes = async (req, res, next) => {
  try {
    const response = await TestPaperServices.getAllTestPaperes(req.query);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getRecentTestPaper = async (req, res, next) => {
  try {
    const response = await TestPaperServices.getRecentTestPaper(
      req.query.limit
    );
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Test Paper");
  }
};

export const getTestPaperById = async (req, res, next) => {
  try {
    const response = await TestPaperServices.getTestPaperById(req.query.id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getTestPaperByClass = async (req, res, next) => {
  try {
    const response = await TestPaperServices.getTestPaperByClass(req.query.id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const updateTestPaper = async (req, res, next) => {
  try {
    const response = await TestPaperServices.updateTestPaper(req.body);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Test Paper");
  }
};

export const deleteTestPaper = async (req, res, next) => {
  try {
    const response = await TestPaperServices.deleteTestPaper(req.params.slug);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
