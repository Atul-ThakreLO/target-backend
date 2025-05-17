import prisma from "../../config/prismaClient.js";
import ErrorHandler from "../../helper/Error.js";
import {
  cloudinaryDelete,
  cloudinaryUpload,
} from "../../utils/cloudinaryUpload.js";

class NotesServices {
  async createNotes(data, file, staff_id) {
    let upload;
    let response;
    const unique = new Date();
    try {
      // /////// Check if notes with same title already exists
      // const check = await prisma.notes.findFirst({
      //   where: {
      //     title: data.title,
      //   },
      // });
      // if (check) {
      //   throw new ErrorHandler("Notes with this title already exists", 400);
      // }

      // /////////// Upload notes to cloudinary
      upload = await cloudinaryUpload(file, `${data.title}-${unique}`);
      // /////////// Create notes
      response = await prisma.notes.create({
        data: {
          ...data,
          office_staff_id: staff_id,
          url: upload.secure_url,
          public_id: upload.public_id,
        },
      });
      // if (response === "null" || !response) {
      //   throw new ErrorHandler("Notes Nahi bana raha hai", 400);
      // }
      return response;
    } catch (err) {
      console.log("err", err);
      if (upload && !response) {
        const deleteResponse = await cloudinaryDelete(
          file,
          `pdf_documents/${data.title}-${unique}.${file.mimetype.split("/")[1]}`
        );
        console.log("delete now", deleteResponse);
      }
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getAllNotes(query) {
    try {
      const response = await prisma.notes.findMany({
        where: {
          ...query,
        },
        orderBy: {
          date: "desc",
        },
        include: {
          officeStaff: {
            select: {
              OfficeStaffInfo: {
                select: {
                  name: true,
                },
              },
            },
          },
          subject: {
            select: {
              name: true,
            },
          },
          class: {
            select: {
              name: true,
            },
          },
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Notes Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getNotesById(id) {
    try {
      const response = await prisma.notes.findUnique({
        where: {
          OR: [{ id: id }, { title: id }],
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Notes Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateNotes(id, data) {
    try {
      const response = await prisma.notes.update({
        where: {
          id: id,
        },
        data: data,
      });
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteNotes(id) {
    try {
      const response = await prisma.notes.delete({
        where: {
          id: id,
        },
      });
      if (response.url) {
        const destroy = await cloudinaryDelete(
          { mimetype: "application" },
          response.public_id
        );
        console.log("destroyed", destroy);
      }
      return response;
    } catch (err) {
      console.log(err);

      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteManyNotes(id, publicIDs) {
    try {
      const response = await prisma.notes.deleteMany({
        where: {
          id: {
            in: id,
          },
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Notes Nahi mil raha hai", 404);
      }
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
      console.log(err);

      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async provideNotes(data) {
    try {
      const notesData = data.note_id.map((note_id) => ({
        batch_id: data.batch_id,
        note_id,
      }));
      console.log(notesData);

      const response = await prisma.batchesNotes.createMany({
        data: notesData,
        skipDuplicates: true,
      });
      console.log(response);

      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getProvidedNotes(query) {
    try {
      const response = prisma.batchesNotes.findMany({
        where: {
          note: {
            ...query,
          },
          batch: {
            isActive: true,
          },
        },
        include: {
          note: true,
          batch: {
            include: {
              class: true,
            },
          },
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async unprovideNotes(id) {
    try {
      const response = prisma.batchesNotes.delete({
        where: {
          id,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async unprovideManyNotes(id) {
    try {
      const response = await prisma.batchesNotes.deleteMany({
        where: {
          id: {
            in: id,
          },
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
  // async notesStatus() {
  //   try {
  //     const response = await prisma.notes.update({
  //       where: {
  //         id: id,
  //       },
  //       data: {
  //         is
  //       }
  //     });
  //   } catch (error) {}
  // }
  async getNotesForStudent(batchID, studentID, subjectID) {
    try {
      const response = await prisma.batchesNotes.findMany({
        where: {
          batch_id: batchID,
          note: {
            subject_id: subjectID ? subjectID : undefined,
            subject: {
              StudentSubjects: {
                some: {
                  student_id: studentID,
                },
              },
            },
          },
        },
        select: {
          id: true,
          note: {
            select: {
              // officeStaff: {
              //   select: {
              //     OfficeStaffInfo: {
              //       select: {
              //         name: true,
              //       },
              //     },
              //   },
              // },
              title: true,
              url: true,
              subject: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      console.log(response);

      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new NotesServices();
