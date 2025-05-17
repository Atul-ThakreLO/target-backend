import prisma from "../../config/prismaClient.js";
import ErrorHandler from "../../helper/Error.js";

class MarksServices {
  async addMarksToStodent(data) {
    try {
      const response = await prisma.testPaperStudents.create({
        data: data,
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Notes Nahi bana raha hai", 400);
      }
      return response;
    } catch (err) {
      console.log("err", err);
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getMarks(query) {
    try {
      const response = await prisma.student.findMany({
        where: {
          StudentInfo: {
            batch_id: query.batchId,
          },
          StudentSubjects: {
            some: {
              subject_id: query.subject_id,
            },
          },
        },
        include: {
          TestPaperStudents: {
            where: {
              test_paper_id: query.id,
            },
          },
          StudentInfo: {
            select: {
              student_name: true,
              avtar_url: true,
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

  async getMarksById(id) {
    try {
      const response = await prisma.testPaperStudents.findUnique({
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

  async updateMarks(id, data) {
    try {
      const response = await prisma.testPaperStudents.update({
        where: {
          id: id,
        },
        data: data,
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

  async deleteMarks(id) {
    try {
      const response = await prisma.testPaperStudents.delete({
        where: {
          id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Notes Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      console.log(err);

      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteManyMarks(id) {
    try {
      const response = await prisma.testPaperStudents.deleteMany({
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

  async getMarksForStudent(studentID) {
    try {
      const response = await prisma.$transaction(async (prisma) => {
        const student = await prisma.studentInfo.findUnique({
          where: {
            student_id: studentID,
          },
          select: {
            class_id: true,
          },
        });
        const response = await prisma.testPaperStudents.findMany({
          where: {
            student_id: studentID,
            test_paper: {
              class_id: student.class_id,
            },
          },
          orderBy: {
            marks: "desc",
          },
          select: {
            marks: true,
            test_paper: {
              select: {
                papers: {
                  select: {
                    url: true,
                  },
                },
                totalMarks: true,
                title: true,
                subject: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });
        return response;
      });

      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new MarksServices();
