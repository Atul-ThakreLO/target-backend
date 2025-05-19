import prisma from "../../config/prismaClient.js";

class ResultServices {
  async createResult(data) {
    try {
      const response = await prisma.result.create({
        data: data,
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async getResult({ id, session }) {
    console.log("result", id, session);
    try {
      const response = await prisma.result.findMany({
        include: {
          student: {
            select: {
              StudentInfo: {
                select: {
                  student_name: true,
                  avtar_url: true,
                },
              },
            },
          },
        },
        where: {
          student: {
            StudentInfo: {
              class: {
                id: id,
              },
              batches: {
                session: session,
              },
            },
          },
        },
        orderBy: {
          total_percent: "desc",
        },
      });
      console.log(response);

      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getStudents(session, c) {
    try {
      const response = await prisma.student.findMany({
        where: {
          AND: [
            {
              StudentInfo: {
                batches: {
                  session: session,
                },
              },
            },
            {
              StudentInfo: {
                class_id: c,
              },
            },
          ],
        },
        orderBy: {
          StudentInfo: {
            student_name: "asc",
          },
        },
        select: {
          id: true,
          Result: true,
          StudentInfo: {
            select: {
              student_name: true,
            },
          },
          StudentSubjects: {
            select: {
              subject_id: true,
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
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateResult(data, id) {
    try {
      const response = await prisma.result.update({
        where: {
          id: id,
        },
        data: data,
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteResult(id) {
    try {
      const response = await prisma.result.delete({
        where: {
          id: id,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteManyResult(ids) {
    try {
      console.log(ids);

      const response = await prisma.result.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      console.log(response);
      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default new ResultServices();
