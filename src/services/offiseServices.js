import ErrorHandler from "../helper/Error.js";
import prisma from "../config/prismaClient.js";
import { getAccessToken, getRefreshToken } from "../utils/jwtToken.js";
import {
  cloudinaryDelete,
  cloudinaryUpload,
} from "../utils/cloudinaryUpload.js";

class OffiseServices {
  async createOffiseStaff(data, payload, file) {
    const { staff, info } = data;
    let response = null;
    let upload = null;
    try {
      upload = await cloudinaryUpload(file, staff.email);
      response = await prisma.$transaction(async (prisma) => {
        const staffResp = await prisma.officeStaff.create({
          data: staff,
        });
        const infoResp = await prisma.officeStaffInfo.create({
          data: {
            ...info,
            office_staff_id: staffResp.id,
            avtar_url: upload.secure_url,
            public_id: upload.public_id,
          },
        });
        const { jobApplications } = await prisma.jobPostings.delete({
          where: {
            id: payload.job_id,
          },
          include: {
            jobApplications: {
              select: {
                resume_public_id: true,
              },
            },
          },
        });
        return { staffResp, infoResp, jobApplications };
      });
      // if (response === "null" || !response) {
      //   throw new ErrorHandler(
      //     "You regestration is not Completed, Try Later",
      //     500
      //   );
      // }
      if (response.jobApplications?.[0].resume_public_id) {
        const destroy = await cloudinaryDelete(
          { mimetype: "application" },
          response.jobApplications[0].resume_public_id
        );
        console.log("resume deletted", destroy);
      }

      const token = getAccessToken(
        {
          id: response.staffResp.id,
          email: response.staffResp.email,
        },
        process.env.JWT_SECRET,
        "1d"
      );
      // console.log(token);
      const refreshToken = getRefreshToken(
        {
          id: response.staffResp.id,
          email: response.staffResp.email,
        },
        process.env.JWT_REFRESH_SECRET,
        "7d"
      );
      return { response, refreshToken, token };
    } catch (err) {
      console.log(err);
      if (upload && !response) {
        try {
          const deleteFile = await cloudinaryDelete(
            file,
            `images/${staff.email}`
          );
          console.log("deleted", deleteFile);
        } catch (err) {
          console.log(err);
        }
      }
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async loginStaff(data) {
    try {
      const response = await prisma.officeStaff.findFirst({
        where: {
          email: data.email,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Student nahi mila", 404);
      }
      // console.log(response);
      // console.log(data.password);

      if (response.password !== data.password) {
        throw new ErrorHandler("Password galat hai", 404);
      }
      const token = getAccessToken(
        {
          id: response.id,
          email: response.email,
        },
        process.env.JWT_SECRET,
        "1d"
      );
      // console.log(token);
      const refreshToken = getRefreshToken(
        {
          id: response.id,
          email: response.email,
        },
        process.env.JWT_REFRESH_SECRET,
        "7d"
      );
      return { response, refreshToken, token };
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getStaff(slug, next) {
    try {
      const response = await prisma.officeStaff.findFirst({
        where: {
          OR: [
            { id: slug }, // Assuming `slug` could match `id`
            { email: slug }, // Assuming `slug` could match `email`
          ],
        },
        include: {
          password: false, // Exclude the password field
          OfficeStaffInfo: true, // Include OfficeStaffInfo relation
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Student mill nahi raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getAllStaff(queries) {
    try {
      const response = await prisma.officeStaff.findMany({
        where: {
          OfficeStaffInfo: queries,
        },
        include: {
          password: false,
          OfficeStaffInfo: true,
        },
      });
      // if (response === "null" || !response) {
      //   throw new ErrorHandler("Staffs mill nahi rahe", 404);
      // }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteStaff(slug) {
    try {
      const response = await prisma.officeStaff.delete({
        where: {
          id: slug,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Staff delete nahi hua", 404);
      }
      if (response.url) {
        const destroy = await cloudinaryDelete("image/", response.public_id);
        // console.log("destroyed", destroy);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateStaff(id, data) {
    try {
      const response = await prisma.officeStaffInfo.update({
        where: {
          office_staff_id: id,
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

  async updateProfilePicture(id, file) {
    let upload = null;
    let response = null;
    try {
      const { public_id } = await prisma.officeStaffInfo.findFirst({
        where: {
          office_staff_id: id,
        },
        select: {
          public_id: true,
        },
      });
      upload = await cloudinaryUpload(file, public_id.split("/")[1]);
      response = await prisma.officeStaffInfo.update({
        where: {
          office_staff_id: id,
        },
        data: {
          avtar_url: upload.secure_url,
          public_id: upload.public_id,
        },
      });
      return { public_id: upload.public_id, id: response.office_staff_id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async verifyStaff(data) {
    try {
      const { id, status } = data;
      const response = await prisma.officeStaffInfo.update({
        where: {
          office_staff_id: id,
        },
        data: {
          isVerified: status,
        },
      });
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async verifyAdmin(data) {
    try {
      const response = await prisma.officeStaffInfo.update({
        where: {
          id: data.id,
        },
        data: {
          isAdmin: true,
        },
      });
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getStudents10th() {
    try {
      const response = await prisma.student.findMany({
        where: {
          StudentInfo: {
            class: {
              name: "10th",
            },
          },
        },
        select: {
          StudentInfo: {
            select: {
              student_name: true,
            },
          },
          TestPaperStudents: {
            select: {
              marks: true,
            },
          },
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async getStudents12th() {
    try {
      const response = await prisma.student.findMany({
        where: {
          StudentInfo: {
            class: {
              name: "11th-12th",
            },
          },
        },
        select: {
          StudentInfo: {
            select: {
              student_name: true,
            },
          },
          TestPaperStudents: {
            select: {
              marks: true,
            },
          },
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  calcTopper(students) {
    const marks = students.map((student) => {
      if (student.TestPaperStudents.length > 1) {
        return {
          student_name: student.StudentInfo.student_name,
          totalMarks: student.TestPaperStudents.reduce(
            (prev, curr) => parseInt(prev.marks) + parseInt(curr.marks)
          ),
        };
      } else {
        return {
          student_name: "Not Calculated",
          totalMarks: 0,
        };
        // return {
        //   student_name: student.StudentInfo.student_name,
        //   totalMarks: parseInt(student?.TestPaperStudents[0]?.marks),
        // };
      }
    });
    const topper = marks.sort((a, b) => b.totalMarks - a.totalMarks)[0];
    return topper;
  }

  async getDashboardData() {
    try {
      const studentCount = await prisma.student.count();
      const batchCount = await prisma.batches.count();
      const staffCount = await prisma.officeStaff.count();

      const student10th = await this.getStudents10th();
      const student12th = await this.getStudents12th();

      const topper12th = this.calcTopper(student12th);
      const topper10th = this.calcTopper(student10th);

      return { staffCount, batchCount, studentCount, topper12th, topper10th };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new OffiseServices();
