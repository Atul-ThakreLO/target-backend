import prisma from "../../config/prismaClient.js";
import ErrorHandler from "../../helper/Error.js";
import {
  cloudinaryDelete,
  cloudinaryUpload,
} from "../../utils/cloudinaryUpload.js";

class AssignmentServices {
  async createAssignment(data, file, id) {
    let response;
    let upload;
    try {
      upload = await cloudinaryUpload(file, data.title);
      response = await prisma.assignments.create({
        data: {
          ...data,
          staff_id: id,
          pdf_url: upload.secure_url,
          public_id: upload.public_id,
        },
      });
      // if (response === "null" || !response) {
      //   throw new ErrorHandler("Notes Nahi bana raha hai", 400);
      // }
      // console.log(response);
      return response;
    } catch (err) {
      console.log("err", err);
      if (upload && !response) {
        const deleteResponse = await cloudinaryDelete(
          file,
          `pdf_documents/${data.title}.${file.mimetype.split("/")[1]}`
        );
        console.log("delete", deleteResponse);
      }
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getAllAssignmentes(query) {
    try {
      const response = await prisma.assignments.findMany({
        where: {
          ...query,
        },
        include: {
          staff: {
            include: {
              OfficeStaffInfo: {
                select: {
                  name: true,
                },
              },
            },
          },
          class: {
            select: {
              name: true,
            },
          },
          subject: {
            select: {
              name: true,
            },
          },
          batch: {
            select: {
              name: true,
            },
          },
        },
      });
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getRecentAssignments(limit) {
    try {
      const response = await prisma.assignments.findMany({
        take: parseInt(limit),
        orderBy: {
          date: "desc",
        },
        select: {
          title: true,
          _count: {
            select: { completedAssignment: true },
          },
          batch: {
            select: {
              _count: {
                select: {
                  students: true,
                },
              },
            },
          },
        },
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getAssignmentById(id) {
    try {
      const response = await prisma.assignments.findUnique({
        where: {
          id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Assignment Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateAssignment(id, data) {
    try {
      const response = await prisma.assignments.update({
        where: {
          id: id,
        },
        data: data,
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Assignment Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteAssignment(id) {
    try {
      const response = await prisma.assignments.delete({
        where: {
          id: id,
        },
        select: {
          public_id: true,
          completedAssignment: {
            select: {
              public_id: true,
            },
          },
        },
      });
      try {
        if (response) {
          const destroyAssi = await cloudinaryDelete(
            { mimetype: "application" },
            response.public_id
          );
          response.completedAssignment.forEach(async (assi) => {
            const destroySubmiton = await cloudinaryDelete(
              { mimetype: "application" },
              assi.public_id
            );
          });
        }
      } catch (err) {
        console.log("delete", err);
        throw err;
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getStudentsAssignment(batchID, assiID) {
    try {
      const response = await prisma.$transaction(async (prisma) => {
        const response = await prisma.student.findMany({
          where: {
            StudentInfo: {
              batch_id: batchID,
            },
            StudentSubjects: {
              some: {
                subject: {
                  assignments: {
                    some: {
                      id: assiID,
                    },
                  },
                },
              },
            },
          },
          include: {
            StudentInfo: {
              select: {
                student_name: true,
              },
            },
            CompletedAssignment: {
              where: {
                assi_id: assiID,
              },
            },
          },
        });
        const count = await prisma.completedAssignment.count({
          where: {
            assi_id: assiID,
          },
        });
        return { response, count };
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getAssignmentForStudent(studentID, id, subjectID) {
    try {
      const response = await prisma.assignments.findMany({
        where: {
          batch_id: id,
          subject_id: subjectID ? subjectID : undefined,
          subject: {
            StudentSubjects: {
              some: {
                student_id: studentID,
              },
            },
          },
        },
        select: {
          id: true,
          title: true,
          subject_id: true,
          subject: {
            select: {
              name: true,
            },
          },
          date: true,
          pdf_url: true,
          completedAssignment: {
            where: {
              student_id: studentID,
            },
          },
        },
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async submitAssignment(data, file, user) {
    let upload;
    let response;
    try {
      // const response = `assi-${user.email}-${data.assi_id}`
      // console.log(response);
      upload = await cloudinaryUpload(
        file,
        `assi-${user.email}-${data.assi_id}`
      );
      response = await prisma.completedAssignment.create({
        data: {
          ...data,
          student_id: user.id,
          pdf_url: upload.secure_url,
          public_id: upload.public_id,
        },
      });
      return response;
    } catch (err) {
      console.log("err", err);
      if (upload && !response) {
        const deleteResponse = await cloudinaryDelete(
          file,
          `pdf_documents/assi-${user.email}-${data.assi_id}.${
            file.mimetype.split("/")[1]
          }`
        );
        console.log("delete", deleteResponse);
      }
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async unSubmitAssignment(id) {
    try {
      const response = await prisma.completedAssignment.delete({
        where: {
          id: id,
        },
      });
      // console.log(response.pdf_url, response.public_id);
      if (response.pdf_url) {
        const destroy = await cloudinaryDelete(
          { mimetype: "application" },
          response.public_id
        );
        console.log(destroy);
      }

      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new AssignmentServices();
