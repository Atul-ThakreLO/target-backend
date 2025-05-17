import { Prisma } from "@prisma/client";
import prismaErrorHandler from "./prismaErrorHandler.js";

const PRISMA_ERRORS = [
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientRustPanicError,
];

const dispatchError = (err, next, name = null) => {
  const isPrismaError = PRISMA_ERRORS.some(
    (ERROR_TYPE) => err instanceof ERROR_TYPE
  );
  if (isPrismaError) {
    prismaErrorHandler(err, next, name);
  } else {
    next(err);
  }
};

export default dispatchError;
