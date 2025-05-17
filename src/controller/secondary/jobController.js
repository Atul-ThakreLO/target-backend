import JobServices from "../../services/secondary/jobServices.js";
import ErrorHandler from "../../helper/Error.js";
import { createError } from "../../helper/errorFunctions.js";
import jwt from "jsonwebtoken";
import dispatchError from "../../helper/dispatchError.js";

export const createJob = async (req, res, next) => {
  try {
    const response = await JobServices.createJob(req.body);
    res.status(201).json(response);
  } catch (err) {
    console.log(err.name, err.code);
    dispatchError(err, next, "Job");
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const response = await JobServices.getAllJobs();
    res.status(200).json(response);
  } catch (err) {
    dispatchError(err, next);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const response = await JobServices.getJobById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Job");
  }
};

export const updateJob = async (req, res, next) => {
  try {
    console.log(req.body);
    const { id, ...data } = req.body;
    console.log(id);
    console.log(data);

    const response = await JobServices.updateJob(id, data);
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Job");
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    console.log(req.params.slug);
    const response = await JobServices.deleteJob(req.params.slug);
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Job");
  }
};

export const applyJob = async (req, res, next) => {
  try {
    const response = await JobServices.applyJob(req.body, req.file);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Job");
  }
};

export const getJobApplications = async (req, res, next) => {
  try {
    const response = await JobServices.getJobApplications(req.query.id);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Job");
  }
};

export const acceptJobLatter = async (req, res, next) => {
  try {
    const { id, name, email, job_id  } = req.body;
    const response = await JobServices.acceptJobLatter(id, email, name, job_id, req.headers.referer);
    res.status(200).json(response);
  } catch (err) {
    console.log("err", err);
    dispatchError(err, next, "Job");
  }
};
