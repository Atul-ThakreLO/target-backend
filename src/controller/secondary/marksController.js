import MarksServices from "../../services/secondary/marksServices.js";
import dispatchError from "../../helper/dispatchError.js";

export const addMarksToStodent = async (req, res, next) => {
  try {
    const response = await MarksServices.addMarksToStodent(req.body);
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Marks");
  }
};

export const getMarks = async (req, res, next) => {
  try {
    const response = await MarksServices.getMarks(req.query);
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Marks");
  }
};

export const updateMarks = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    const response = await MarksServices.updateMarks(id, data);
    res.status(200).json(response);
  } catch (err) {
    dispatchError(err, next, "Marks");
  }
};

export const deleteMarks = async (req, res, next) => {
  try {
    const response = await MarksServices.deleteMarks(req.params.slug);
    res.status(200).json(response);
  } catch (err) {
    dispatchError(err, next, "Marks");
  }
};

export const getMarksForStudent = async (req, res, next) => {
  try {
    const response = await MarksServices.getMarksForStudent(req.user.id);
    res.status(200).json(response);
  } catch (err) {
    dispatchError(err, next, "Marks")
  }
}
