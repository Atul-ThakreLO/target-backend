import prisma from "../../config/prismaClient.js";
import ErrorHandler from "../../helper/Error.js";

class SchoolServices {
  async createSchool(data) {
    try {
      const response = await prisma.school.create({ data: data });
      if (response === "null" || !response) {
        throw new ErrorHandler("School Nahi bana raha hai", 400);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async setSchoolStatus(data) {
    try {
      const { id, status } = data;
      const response = await prisma.school.update({
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

  async getAllSchooles() {
    try {
      const response = await prisma.school.findMany({
        orderBy: {
          name: "asc",
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("School Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getSchoolById(id) {
    try {
      const response = await prisma.school.findUnique({
        where: {
          school_id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("School Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateSchool({ id, name }) {
    try {
      const response = await prisma.school.update({
        where: {
          id: id,
        },
        data: {
          name: name,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("School Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteSchool(id) {
    try {
      const response = await prisma.school.delete({
        where: {
          school_id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("School Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new SchoolServices();
