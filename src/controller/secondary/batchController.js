import BatchServices from "../../services/secondary/batchServices.js";
import { createError } from "../../helper/errorFunctions.js";
import dispatchError from "../../helper/dispatchError.js";

export const createBatch = async (req, res, next) => {
  try {
    const response = await BatchServices.createBatch(req.body);
    res.status(201).json(response);
  } catch (err) {
    console.log(err.name, err.code);
    createError(err, "Class", next);
  }
};

export const setBatchesStatus = async (req, res, next) => {
  try {
    const response = await BatchServices.setBatchesStatus(req.body);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, "Subject", next);
  }
};

export const getAllBatch = async (req, res, next) => {
  try {
    const response = await BatchServices.getAllBatch();
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getAllBatchByClass = async (req, res, next) => {
  try {
    const response = await BatchServices.getAllBatchByClass(req.query.class_id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getAllBatchsGroupByClass = async (req, res, next) => {
  try {
    const response = await BatchServices.getAllBatchesGroupByClass();
    res.status(200).json(response);
  } catch (err) {
    dispatchError(err, next, "Batch");
  }
};

export const getBatchById = async (req, res, next) => {
  try {
    const response = await BatchServices.getBatchById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const updateBatch = async (req, res, next) => {
  try {
    const response = await BatchServices.updateBatch(req.body);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const deleteBatch = async (req, res, next) => {
  try {
    const response = await BatchServices.deleteBatch(req.params.slug);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
