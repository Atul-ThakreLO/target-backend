import AssignmentServices from "../../services/secondary/assignmentServices.js";
import ErrorHandler from "../../helper/Error.js";
import { createError } from "../../helper/errorFunctions.js";
import dispatchError from "../../helper/dispatchError.js";

export const createAssignment = async (req, res, next) => {
  try {
    const response = await AssignmentServices.createAssignment(
      req.body,
      req.file,
      req.user.id
    );
    res.status(201).json(response);
  } catch (err) {
    createError(err, "Assignment", next);
  }
};

export const getAllAssignmentes = async (req, res, next) => {
  try {
    const response = await AssignmentServices.getAllAssignmentes(req.query);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getRecentAssignments = async (req, res, next) => {
  try {
    const response = await AssignmentServices.getRecentAssignments(
      req.query.limit
    );
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Assignment");
  }
};

export const getAssignmentById = async (req, res, next) => {
  try {
    const response = await AssignmentServices.getAssignmentById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const updateAssignment = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    const response = await AssignmentServices.updateAssignment(id, data);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const deleteAssignment = async (req, res, next) => {
  try {
    const response = await AssignmentServices.deleteAssignment(req.params.slug);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getStudentsAssignment = async (req, res, next) => {
  try {
    const response = await AssignmentServices.getStudentsAssignment(
      req.query.batchID,
      req.query.assiID,
      req.user.id
    );
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

export const getAssignmentForStudent = async (req, res, next) => {
  try {
    const response = await AssignmentServices.getAssignmentForStudent(
      req.user.id,
      req.query.batchID,
      req.query.subjectID
    );
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Asssignments");
  }
};

export const submitAssignment = async (req, res, next) => {
  try {
    const response = await AssignmentServices.submitAssignment(
      req.body,
      req.file,
      req.user
    );
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Assignment");
  }
};

export const unSubmitAssignment = async (req, res, next) => {
  try {
    const response = await AssignmentServices.unSubmitAssignment(
      req.params.slug
    );
    res.status(200).json(response);
  } catch (err) {
    dispatchError(err, next, "Assignment");
  }
};
