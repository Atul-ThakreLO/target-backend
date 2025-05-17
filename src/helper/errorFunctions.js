import ErrorHandler from "./Error.js";

export const createError = (err, name, next) => {
  console.log(err);
  
  if (err.code === "P2002") {
    return next(
      new ErrorHandler(`Lagta hai ${name} pehlesehi registered hai`, 400)
    );
  } else if (
    err.name === "PrismaClientKnownRequestError" ||
    err.name === "PrismaClientValidationError"
  ) {
    return next(new ErrorHandler("Kuch toh gadbad hai hai zhatya", 400));
  }
  next(err);
};

export const deleteError = (err, name, next) => {
  if(err.name === "PrismaClientValidationError") {
    return next(new ErrorHandler(`${name} delete karne me gadbad ho rahi hai ek bar reload kar ke try kijiye`, 400));
    // return next(new ErrorHandler("Aap galat student delete karne ki koshish kar rahe ho", 400));
  } else if (err.name === "PrismaClientKnownRequestError") {
    return next(new ErrorHandler("Aap ki Id galat Hai phir se try kariye", 400));
  }
  next(err);
}
