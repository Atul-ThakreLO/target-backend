import dispatchError from "../../helper/dispatchError.js";
import resultServices from "../../services/secondary/resultServices.js";

export const createResult = async (req, res, next) => {
  try {
    console.log(req.body);

    const response = await resultServices.createResult(req.body);
    console.log("respons", response);

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Result");
  }
};

export const getResult = async (req, res, next) => {
  try {
    const response = await resultServices.getResult(req.query);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Result");
  }
};
export const getStudents = async (req, res, next) => {
  try {
    const response = await resultServices.getStudents(
      req.query.session,
      req.query.class_id
    );
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Result");
  }
};

export const updateResult = async (req, res, next) => {
  try {
    console.log(req.body);
    const { id, ...data } = req.body;
    const response = await resultServices.updateResult(data, id);
    res.status(200).json(response);
  } catch (err) {
    dispatchError(err, next, "Result");
    console.log(err);
  }
};

export const deleteResult = async (req, res, next) => {
  try {
    console.log(req.params.slug);
    const response = await resultServices.deleteResult(req.params.slug);
    res.status(200).json(response);
  } catch (err) {
    dispatchError(err, next, "Result");
    console.log(err);
  }
};

export const deleteManyResult = async (req, res, next) => {
  try {
    const response = await resultServices.deleteManyResult(req.body.ids);
    res.status(200).json(response);
  } catch (err) {
    dispatchError(err, next, "Result");
    console.log(err);
  }
};
