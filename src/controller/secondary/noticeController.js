import NoticeServices from "../../services/secondary/noticeServices.js";
import { createError } from "../../helper/errorFunctions.js";
import dispatchError from "../../helper/dispatchError.js";

export const createNotice = async (req, res, next) => {
  try {
    console.log("called");
    const response = await NoticeServices.createNotice(req.body, req.user.id);
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Notice");
  }
};

export const getAllNotices = async (req, res, next) => {
  try {
    const response = await NoticeServices.getAllNoticees();
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getNoticeById = async (req, res, next) => {
  try {
    const response = await NoticeServices.getNoticeById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const updateNotice = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    const response = await NoticeServices.updateNotice(id, data);
    res.status(200).json(response);
    // res.status(200).json("Hello");
  } catch (err) {
    console.log(err);

    next(err);
  }
};

export const deleteNotice = async (req, res, next) => {
  try {
    const response = await NoticeServices.deleteNotice(req.params.slug);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getNoticeForStudent = async (req, res, next) => {
  try {
    const response = await NoticeServices.getNoticeForStudent();
    res.status(200).json(response);
  } catch (err) {
    dispatchError(err, next, "Notices");
  }
};
