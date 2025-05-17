import prisma from "../../config/prismaClient.js";
import ErrorHandler from "../../helper/Error.js";
import { sendMail } from "../../utils/mailService.js";
import jobMail from "../../Mail/jobTemplate.js";
import { getAccessToken } from "../../utils/jwtToken.js";
import {
  cloudinaryDelete,
  cloudinaryUpload,
} from "../../utils/cloudinaryUpload.js";

class JobServices {
  async createJob(data) {
    try {
      const jobPosting = await prisma.jobPostings.create({
        data: data,
      });
      if (!jobPosting || jobPosting.length === 0 || jobPosting === null) {
        throw new ErrorHandler("Failed to create job posting", 400);
      }
      return jobPosting;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getAllJobs() {
    try {
      const response = await prisma.jobPostings.findMany();
      if (response === "null" || !response) {
        throw new ErrorHandler("Job Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      console.log(err);

      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getJobById(id) {
    try {
      const response = await prisma.jobPostings.findUnique({
        where: {
          id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Job Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateJob(id, data) {
    try {
      const response = await prisma.jobPostings.update({
        where: {
          id: id,
        },
        data: data,
      });
      // if (response === "null" || !response) {
      //   throw new ErrorHandler("Job Nahi mil raha hai", 404);
      // }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteJob(id) {
    try {
      const response = await prisma.jobPostings.delete({
        where: {
          id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Job Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async applyJob(data, file) {
    let upload;
    let response;
    try {
      upload = await cloudinaryUpload(file, data.email);
      response = await prisma.jobApplications.create({
        data: {
          ...data,
          resume_url: upload.secure_url,
          resume_public_id: upload.public_id,
        },
      });
      // if (!response || response.length === 0 || response === null) {
      //   throw new ErrorHandler("Failed to Apply for Job", 400);
      // }
      return response;
    } catch (err) {
      console.log(err);
      if (upload && !response) {
        const deleteFile = await cloudinaryDelete(
          file,
          `pdf_documents/${data.email}.${file.mimetype.split("/")[1]}`
        );
        console.log("deleted File", deleteFile);
      }
      throw err;
    } finally {
      prisma.$disconnect();
    }
  }

  async getJobApplications(jobId) {
    try {
      const response = await prisma.jobApplications.findMany({
        where: {
          job_id: jobId,
        },
        include: {
          job: true,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      prisma.$disconnect();
    }
  }
  // const uuid = getAccessToken(req.body, process.env.JWT_EMAIL_SECRET, "1h");
  // const link = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/jobs/${uuid}/accepted`;

  async acceptJobLatter(id, email, name, job_id, url) {
    try {
      const token = getAccessToken(
        { id: id, job_id: job_id, email: email },
        process.env.JWT_SECRET,
        "2d"
      );
      // const link = `${url}staff-registration/${name}/${job_id }/${token}`;
      const link = `${url}staff-registration/${email}/${token}`;
      const resp = await sendMail({
        to: email,
        from: process.env.EMAIL,
        subject: "Job Application",
        text: "You have successfully applied for the job",
        htmlPath: jobMail(name, link),
      });
      return resp;
    } catch (err) {
      throw err;
    }
  }
}

// const data = jwt.verify(req.params.id, process.env.JWT_EMAIL_SECRET);
// console.log(data);
// if (!data) {
//   throw new ErrorHandler("Invalid Token", 400);
// }
// const uuid = getAccessToken(
//   data.data,
//   process.env.JWT_EMAIL_SECRET,
//   "1h"
// );
// const link = `${req.protocol}://${req.get(
//   "host"
// )}/staff/create-new/${uuid}`;

// const resp = await sendMail({
//   to: data.data.email,
//   from: process.env.EMAIL,
//   subject: "Job Application",
//   text: "You have successfully applied for the job",
//   htmlPath: acceptJobLatter(data.data, link),
// });
// return resp;
export default new JobServices();
