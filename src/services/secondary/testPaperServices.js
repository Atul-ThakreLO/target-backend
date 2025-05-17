import prisma from "../../config/prismaClient.js";
import ErrorHandler from "../../helper/Error.js";
import { cloudinaryDelete } from "../../utils/cloudinaryUpload.js";

class TestPaperServices {
  async createTestPaper(data, staff_id) {
    try {
      const response = await prisma.testPaper.create({
        data: { ...data, office_staff_id: staff_id },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Class Nahi bana raha hai", 400);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async addTotalMarks({ testID, totalMarks }) {
    try {
      const response = await prisma.testPaper.update({
        where: {
          id: testID,
        },
        data: {
          totalMarks,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async getAllTestPaperes(query) {
    try {
      const response = await prisma.testPaper.findMany({
        where: {
          ...query,
        },
        orderBy: {
          date: "asc",
        },
        include: {
          subject: true,
          class: true,
          batch: true,
          officeStaff: {
            select: {
              OfficeStaffInfo: {
                select: {
                  name: true,
                },
              },
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

  async getRecentTestPaper(limit) {
    try {
      const response = await prisma.testPaper.findMany({
        take: parseInt(limit),
        select: {
          title: true,
          officeStaff: {
            select: {
              OfficeStaffInfo: {
                select: {
                  name: true,
                },
              },
            },
          },
          TestPaperStudents: {
            orderBy: {
              marks: "desc",
            },
            take: 1,
            select: {
              marks: true,
              student: {
                select: {
                  StudentInfo: {
                    select: {
                      student_name: true,
                    },
                  },
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

  async getTestPaperById(id) {
    try {
      const response = await prisma.testPaper.findUnique({
        where: {
          id: id,
        },
        include: {
          officeStaff: {
            select: {
              OfficeStaffInfo: {
                select: {
                  name: true,
                  avtar_url: true,
                },
              },
            },
          },
          papers: {
            select: {
              url: true,
            },
          },
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Class Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getTestPaperByClass(id) {
    try {
      const response = await prisma.testPaper.findUnique({
        where: {
          class_id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Class Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateTestPaper(data) {
    try {
      const { id, batch_id, ...cdata } = data;
      const response = await prisma.$transaction(async (prisma) => {
        const test = await prisma.testPaper.update({
          where: {
            id: id,
          },
          data: {
            batch_id: batch_id,
            ...cdata,
          },
          select: {
            papers: true,
          },
        });
        if (test.papers) {
          await prisma.papers.update({
            where: {
              test_id: id,
            },
            data: cdata,
          });
        }
        return { test };
      });
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteTestPaper(id) {
    try {
      const response = await prisma.testPaper.delete({
        where: {
          id: id,
        },
        select: {
          papers: {
            select: {
              public_id: true,
            },
          },
        },
      });
      try {
        if (response.papers) {
          await cloudinaryDelete(
            { mimetype: "application" },
            response.papers.public_id
          );
        }
      } catch (err) {
        console.log("destroy error", err);
        throw err;
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new TestPaperServices();
