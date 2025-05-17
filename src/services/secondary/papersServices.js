import prisma from "../../config/prismaClient.js";
import ErrorHandler from "../../helper/Error.js";
import {
  cloudinaryDelete,
  cloudinaryUpload,
} from "../../utils/cloudinaryUpload.js";

class PaperServices {
  async createPaper(data, file, staff_id) {
    let upload;
    let response;
    const unique = new Date();
    try {
      upload = await cloudinaryUpload(file, `${data.title}-${unique}`);
      response = await prisma.papers.create({
        data: {
          ...data,
          office_staff_id: staff_id,
          url: upload.secure_url,
          public_id: upload.public_id,
        },
      });
      // if (response === "null" || !response) {
      //   throw new ErrorHandler("Papers Nahi bana raha hai", 400);
      // }
      return response;
    } catch (err) {
      console.log("err", err);
      if (upload && !response) {
        const deleteResponse = await cloudinaryDelete(
          file,
          `pdf_documents/${data.title}-${unique}.${file.mimetype.split("/")[1]}`
        );
        console.log("delete", deleteResponse);
      }
      throw err;
    } finally {
      await prisma.$disconnect();
    }
    // try {
    //   // /////// Check if notes with same title already exists
    //   const check = await prisma.papers.findFirst({
    //     where: {
    //       title: data.title,
    //     },
    //   });
    //   if (check) {
    //     throw new ErrorHandler("Papers with this title already exists", 400);
    //   }

    //   const response = await prisma.papers.create({
    //     data: {
    //       ...data,
    //       office_staff_id: staff_id,
    //       url: "url",
    //       public_id: "public_id",
    //     },
    //   });
    //   if (response === "null" || !response) {
    //     throw new ErrorHandler("Papers Nahi bana raha hai", 400);
    //   }

    //   // /////////// Upload notes to cloudinary
    //   const upload = await cloudinaryUpload(file, data.title);
    //   // console.log("uploaded", upload);

    //   // /////////// Update notes with cloudinary url
    //   const updatedResponse = await prisma.papers.update({
    //     where: {
    //       id: response.id,
    //     },
    //     data: {
    //       url: upload.secure_url,
    //       public_id: upload.public_id,
    //     },
    //   });

    //   return updatedResponse;
    // } catch (err) {
    //   throw err;
    // } finally {
    //   await prisma.$disconnect();
    // }
  }

  async getAllPapers(query) {
    try {
      const response = await prisma.papers.findMany({
        where: {
          ...query,
        },
        orderBy: {
          date: "desc",
        },
        include: {
          class: true,
          subject: true,
          officeStaff: {
            select: {
              OfficeStaffInfo: {
                select: {
                  name: true,
                },
              },
            },
          },
          test: {
            select: {
              title: true,
            },
          },
        },
      });
      // if (response === "null" || !response) {
      //   throw new ErrorHandler("Papers Nahi mil raha hai", 404);
      // }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getPaperById(id) {
    try {
      const response = await prisma.papers.findFirst({
        where: {
          id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Papers Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async updatePaper(data) {
    const { id, ...updateData } = data;
    try {
      const response = await prisma.papers.update({
        where: {
          id: id,
        },
        data: updateData,
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Papers Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deletePaper(id) {
    const response = await prisma.papers.delete({
      where: {
        id: id,
      },
    });
    // if (response === "null" || !response) {
    //   throw new ErrorHandler("Papers Nahi mil raha hai", 404);
    // }
    if (response.url) {
      const destroy = await cloudinaryDelete(
        { mimetype: "application" },
        response.public_id
      );
      console.log("destroyed", destroy);
    }
    return response;
  }

  async deleteManyPapers(id, publicIDs) {
    try {
      const response = await prisma.papers.deleteMany({
        where: {
          id: {
            in: id,
          },
        },
      });
      // if (response === "null" || !response) {
      //   throw new ErrorHandler("Notes Nahi mil raha hai", 404);
      // }
      if (response.count) {
        publicIDs.forEach(async (id) => {
          const destroy = await cloudinaryDelete(
            { mimetype: "application" },
            id
          );
          console.log("destroyed", destroy);
        });
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getPapersForStudent(classID, studentID, subjectID, session) {
    try {
      const response = await prisma.papers.findMany({
        where: {
          class_id: classID,
          subject_id: subjectID ? subjectID : undefined,
          subject: {
            StudentSubjects: {
              some: {
                student_id: studentID,
              },
            },
          },
          date: {
            gte: new Date(`${session}`, 0, 1),
            lt: new Date(`${session + 1}`, 0, 1),
          },
        },
        select: {
          id: true,
          title: true,
          url: true,
          subject: {
            select: {
              name: true,
            },
          },
        },
      });
      // console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new PaperServices();
