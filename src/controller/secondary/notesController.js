import fs from "fs";
import NotesServices from "../../services/secondary/notesServices.js";
import ErrorHandler from "../../helper/Error.js";
import { createError, deleteError } from "../../helper/errorFunctions.js";
import dispatchError from "../../helper/dispatchError.js";

export const createNotes = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ErrorHandler("Please upload a file", 400);
    }
    const response = await NotesServices.createNotes(req.body, req.file, req.user.id);
    res.status(201).json(response);
    fs.unlinkSync(req.file.path);
  } catch (err) {
    console.log(err);

    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    dispatchError(err, next, "Notes");
  }
};

export const getAllNotes = async (req, res, next) => {
  try {
    const response = await NotesServices.getAllNotes(req.query);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getNotesById = async (req, res, next) => {
  try {
    const response = await NotesServices.getNotesById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const updateNotes = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    const response = await NotesServices.updateNotes(id, data);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const deleteNotes = async (req, res, next) => {
  try {
    const id = req.params.slug;
    const response = await NotesServices.deleteNotes(id);
    res.status(200).json(response);
  } catch (err) {
    deleteError(err, "Notes", next);
  }
};

export const deleteManyNotes = async (req, res, next) => {
  try {
    const response = await NotesServices.deleteManyNotes(
      req.body.ids,
      req.body.public_ids
    );
    res.status(200).json(response);
  } catch (err) {
    deleteError(err, "Notes", next);
  }
};

export const provideNotes = async (req, res, next) => {
  try {
    const response = await NotesServices.provideNotes(req.body);
    res.status(201).json(response);
  } catch (err) {
    dispatchError(err, next, "Provided Notes");
  }
};

export const getProvidedNotes = async (req, res, next) => {
  try {
    const response = await NotesServices.getProvidedNotes(req.query);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Provided Notes");
  }
};

export const unprovideNotes = async (req, res, next) => {
  try {
    const response = await NotesServices.unprovideNotes(req.params.slug);
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Provided Notes");
  }
};

export const unprovideManyNotes = async (req, res, next) => {
  try {
    const response = await NotesServices.unprovideManyNotes(req.body.ids);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    deleteError(err, "Notes", next);
  }
};

export const getNotesForStudent = async (req, res, next) => {
  try {
    const response = await NotesServices.getNotesForStudent(
      req.query.batch_id,
      req.query.id,
      // req.user.id,
      req.query.subject_id
    );
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    dispatchError(err, next, "Notes");
  }
};
