import prisma from "../../config/prismaClient.js";
import ErrorHandler from "../../helper/Error.js";

class ClassServices {
  async createClass(data) {
    try {
      const response = await prisma.class.create({ data: data });
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

  async setClassStatus(data) {
    try {
      const { id, status } = data;
      const response = await prisma.class.update({
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

  async getAllClasses() {
    try {
      const response = await prisma.class.findMany({
        orderBy: {
          name: "desc",
        },
      });

      return response.sort((a, b) => {
        const numA = parseInt(a.name);
        const numB = parseInt(b.name);
        return numA - numB;
      });
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getClassById(id) {
    try {
      const response = await prisma.class.findUnique({
        where: {
          id: id,
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

  async updateClass(id, data) {
    try {
      const response = await prisma.class.update({
        where: {
          id: id,
        },
        data: data,
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

  async deleteClass(id) {
    try {
      const response = await prisma.class.delete({
        where: {
          id: id,
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
}

export default new ClassServices();
