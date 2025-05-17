import prisma from "../../config/prismaClient.js";
import ErrorHandler from "../../helper/Error.js";

class NoticeServices {
  async createNotice(data, id) {
    try {
      const response = await prisma.notices.create({
        data: {
          office_staff_id: id,
          ...data,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Notice Nahi bana raha hai", 400);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getAllNoticees() {
    try {
      const response = await prisma.notices.findMany({
        include: {
          OfficeStaff: {
            include: {
              OfficeStaffInfo: {
                select: {
                  name: true,
                  avtar_url: true,
                },
              },
            },
          },
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Notice Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getNoticeById(id) {
    try {
      const response = await prisma.notices.findUnique({
        where: {
          Notice_id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Notice Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateNotice(id, data) {
    try {
      const response = await prisma.notices.update({
        where: {
          id: id,
        },
        data: data,
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Notice Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteNotice(id) {
    try {
      const response = await prisma.notices.delete({
        where: {
          id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Notice Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getNoticeForStudent() {
    try {
      const response = await prisma.notices.findMany({
        include: {
          OfficeStaff: {
            select: {
              email: true,
              OfficeStaffInfo: {
                select: {
                  avtar_url: true,
                  name: true,
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
}

export default new NoticeServices();
