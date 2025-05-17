import prisma from "../../config/prismaClient.js";
import ErrorHandler from "../../helper/Error.js";

class SubjectServices {
  async createSubject(data) {
    try {
      const response = await prisma.subjects.create({ data: data });
      if (response === "null" || !response) {
        throw new ErrorHandler("Subject Nahi bana raha hai", 400);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async setSubjectStatus(data) {
    try {
      const { id, status } = data;
      const response = await prisma.subjects.update({
        where: {
          id: id,
        },
        data: {
          isActive: status,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async getAllSubject() {
    try {
      const response = await prisma.subjects.findMany();
      if (response === "null" || !response) {
        throw new ErrorHandler("Subject Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getAllSubjectByClass(id) {
    try {
      const response = await prisma.subjects.findMany({
        where: {
          class_id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Subject Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getAllSubjectsGroupByClass() {
    try {
      const response = await prisma.class.findMany({
        include: {
          Subjects: true,
        },
      });
      return response.sort((a, b) => {
        const numA = parseInt(a.name);
        const numB = parseInt(b.name);
        return numA - numB;
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getSubjectById(id) {
    try {
      const response = await prisma.subjects.findUnique({
        where: {
          id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Subject Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateSubject(id, data) {
    try {
      const response = await prisma.subjects.update({
        where: {
          id: id,
        },
        data: data,
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Subject Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteSubject(id) {
    try {
      const response = await prisma.subjects.delete({
        where: {
          id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Subject Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new SubjectServices();
