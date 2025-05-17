import prisma from "../config/prismaClient.js";
import ErrorHandler from "../helper/Error.js";
import { getAccessToken, getRefreshToken } from "../utils/jwtToken.js";
import { sendMail } from "../utils/mailService.js";
import otpMail from "../Mail/otpMail.js";
import otpCache from "../config/NodeCache.js";
import generateBase32Secret from "../utils/otp.js";
import {
  cloudinaryDelete,
  cloudinaryUpload,
} from "../utils/cloudinaryUpload.js";

class StudentServices {
  async sendOTP(data) {
    try {
      const otp = generateBase32Secret();
      otpCache.set(data.email, otp);
      const response = await sendMail({
        to: data.email,
        from: process.env.EMAIL,
        subject: "OTP for Registration",
        text: "OTP for Registration",
        htmlPath: otpMail(otp),
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async verifyOTP(data) {
    try {
      const otp = otpCache.get(data.email);
      if (!otp) {
        return "OTP Expired";
      } else if (otp === data.otp) {
        otpCache.del(data.email);
        return "verified";
      } else {
        return "Invalid OTP";
      }
    } catch (err) {
      throw err;
    }
  }

  async createStudent(data, file) {
    const { student, info, subjects } = data;
    let upload = null;
    let response = null;
    try {
      upload = await cloudinaryUpload(file, student.email);
      response = await prisma.$transaction(async (prisma) => {
        const studentResp = await prisma.student.create({
          data: student,
        });
        // console.log(studentResp);
        if (studentResp === "null" || !studentResp) {
          throw new ErrorHandler("Student nahi bana", 404);
        }

        const infoResp = await prisma.studentInfo.create({
          data: {
            ...info,
            student_id: studentResp.id,
            avtar_url: upload.secure_url,
            public_id: upload.public_id,
          },
        });
        const subjectsResp = await prisma.studentSubjects.createMany({
          data: subjects.map((subject) => ({
            student_id: studentResp.id,
            subject_id: subject,
          })),
        });
        return { studentResp, infoResp, subjectsResp };
      });
      console.log(response.studentResp.id);
      if (response === "null" || !response) {
        throw new ErrorHandler(
          "You regestration is not Completed, Try Later",
          500
        );
      }
      const token = getAccessToken(
        { id: response.studentResp.id, email: response.studentResp.email },
        process.env.JWT_SECRET,
        "1d"
      );
      const refreshToken = getRefreshToken(
        { id: response.studentResp.id, email: response.studentResp.email },
        process.env.JWT_REFRESH_SECRET,
        "7d"
      );
      return { response, refreshToken, token };
    } catch (err) {
      if (upload && !response) {
        const deleteAvtar = await cloudinaryDelete(
          file,
          `images/${student.email}`
        );
        console.log("delete", deleteAvtar);
      }
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }
  // async createStudent(data) {
  //   try {
  //     const response = await prisma.student.create({
  //       data,
  //     });
  //     if (response === "null" || !response) {
  //       throw new ErrorHandler("Student nahi bana", 404);
  //     }
  //     return response;
  //   } catch (err) {
  //     throw err;
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }

  async loginStudent(data) {
    try {
      const response = await prisma.student.findFirst({
        where: {
          email: data.email,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Student nahi mila", 404);
      }
      if (response.password !== data.password) {
        throw new ErrorHandler("Password galat hai", 404);
      }

      const token = getAccessToken(
        { id: response.id, email: response.email },
        process.env.JWT_SECRET,
        "1d"
      );
      // console.log(token);
      const refreshToken = getRefreshToken(
        { id: response.id, email: response.email },
        process.env.JWT_REFRESH_SECRET,
        "7d"
      );
      // console.log(refreshTokensArry);
      delete response.password;
      return { response, refreshToken, token };
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getStudent(id, next) {
    try {
      const response = await prisma.student.findUnique({
        where: {
          id: id,
        },
        include: {
          StudentFeesPaid: true,
          password: false,
          StudentInfo: {
            select: {
              student_name: true,
              mobile: true,
              avtar_url: true,
              public_id: true,
              class_id: true,
              school_id: true,
              batch_id: true,
              class: {
                select: {
                  name: true,
                },
              },
              school: {
                select: {
                  name: true,
                },
              },
            },
          },
          StudentSubjects: {
            select: {
              subject: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
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

  async getAllStudents(queries) {
    try {
      const response = await prisma.student.findMany({
        where: {
          StudentInfo: queries,
        },
        include: {
          StudentSubjects: {
            select: {
              subject: {
                select: {
                  name: true,
                },
              },
            },
          },
          StudentInfo: {
            select: {
              class: {
                select: {
                  name: true,
                },
              },
              school: {
                select: {
                  name: true,
                },
              },
              batches: {
                select: {
                  name: true,
                },
              },
              avtar_url: true,
              student_name: true,
              mobile: true,
              isActive: true,
            },
          },
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Students mill nahi rahe", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteStudent(slug) {
    try {
      const response = await prisma.student.delete({
        where: {
          id: slug,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Student delete nahi hua", 404);
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

  async updateStudent(data, id) {
    try {
      const { subjects, ...info } = data;
      const response = await prisma.$transaction(async (prisma) => {
        const infoResp = await prisma.studentInfo.update({
          where: {
            student_id: id,
          },
          data: info,
        });

        const deleteSubjectsResp = await prisma.studentSubjects.deleteMany({
          where: {
            student_id: id,
          },
        });

        const subjectsResp = await prisma.studentSubjects.createMany({
          data: subjects.map((subject) => ({
            student_id: id,
            subject_id: subject,
          })),
        });

        return { infoResp, subjectsResp };
      });
      return response;
    } catch (err) {
      console.log(err);

      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateProfilePicture(id, file) {
    try {
      const { public_id } = await prisma.studentInfo.findFirst({
        where: {
          student_id: id,
        },
        select: {
          public_id: true,
        },
      });
      const upload = await cloudinaryUpload(file, public_id.split("/")[1]);
      const response = await prisma.studentInfo.update({
        where: {
          student_id: id,
        },
        data: {
          avtar_url: upload.secure_url,
          public_id: upload.public_id,
        },
      });
      return { public_id: upload.public_id, id: response.student_id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  // async createStudentInfo(data) {
  //   try {
  //     const { subjects, ...info } = data;
  //     const response = await prisma.studentInfo.create({
  //       data: info,
  //     });
  //     if (response === "null" || !response) {
  //       throw new ErrorHandler("Student nahi bana", 404);
  //     }
  //     return response;
  //   } catch (err) {
  //     throw err;
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }

  // async getStudentInfo(slug, next) {
  //   try {
  //     const response = await prisma.student.findUnique({
  //       where: {
  //         student_id: slug,
  //       },
  //     });
  //     if (response === "null" || !response) {
  //       throw new ErrorHandler("Student mill nahi raha hai", 404);
  //     }
  //     return response;
  //   } catch (err) {
  //     throw err;
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }

  // async getAllStudentsInfo() {
  //   try {
  //     const response = await prisma.student.findMany();
  //     if (response === "null" || !response) {
  //       throw new ErrorHandler("Students mill nahi rahe", 404);
  //     }
  //     return response;
  //   } catch (err) {
  //     throw err;
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }

  // async deleteStudentInfo(slug) {
  //   try {
  //     const response = await prisma.student.delete({
  //       where: {
  //         student_id: slug,
  //       },
  //     });
  //     if (response === "null" || !response) {
  //       throw new ErrorHandler("Student delete nahi hua", 404);
  //     }
  //     return response;
  //   } catch (err) {
  //     throw err;
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }

  async getNotesByStudentId(slug) {
    try {
      const response = await prisma.student.findUnique({
        where: {
          id: slug,
        },
        select: {
          StudentSubjects: {
            select: {
              subject: {
                select: {
                  notes: {
                    select: {
                      url: true,
                      title: true,
                      id: false,
                      subject_id: false,
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Notes mill nahi raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getPapersByStudentId(slug) {
    try {
      const response = await prisma.student.findUnique({
        where: {
          id: slug,
        },
        select: {
          StudentSubjects: {
            select: {
              subject: {
                select: {
                  papers: {
                    select: {
                      url: true,
                      title: true,
                      id: false,
                      subject_id: false,
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Notes mill nahi raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getTestPapersByStudentId(slug) {
    try {
      const response = await prisma.student.findUnique({
        where: {
          id: slug,
        },
        select: {
          TestPaperStudents: true,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Notes mill nahi raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new StudentServices();
