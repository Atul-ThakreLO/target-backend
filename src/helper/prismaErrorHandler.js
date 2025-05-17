import { Prisma } from "@prisma/client";
import ErrorHandler from "./Error.js";

const prismaErrorHandler = (err, next, name) => {
  if (err instanceof Prisma.PrismaClientInitializationError) {
    return next(new ErrorHandler("Database Server Error. Try Later", 500));
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return next(new ErrorHandler("Some Unkown Error Occured", 500));
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    return next(new ErrorHandler("Some validation Error Occured", 500));
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    return next(new ErrorHandler("Server Error Coocured", 500));
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": {
        return next(new ErrorHandler(`${name} is already Exists`));
      }
      case "P2011": {
        return next(new ErrorHandler(`Missing the required field`, 400));
      }
      case "P2025":
        return next(new ErrorHandler("Record not found", 404));

      // Foreign key constraint violation
      case "P2003":
        return next(new ErrorHandler("Invalid relationship reference", 400));

      // Invalid data type
      case "P2006":
        next(new ErrorHandler("Invalid data type provided", 400));
    }
  }
};

export default prismaErrorHandler;
