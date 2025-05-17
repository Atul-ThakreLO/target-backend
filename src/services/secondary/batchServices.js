import prisma from "../../config/prismaClient.js";
import ErrorHandler from "../../helper/Error.js";

class BatchServices {
  async createBatch(data) {
    try {
      const response = await prisma.batches.create({ data: data });
      if (response === "null" || !response) {
        throw new ErrorHandler("Batch Nahi bana raha hai", 400);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async setBatchesStatus(data) {
    console.log(data);

    try {
      const { id, status } = data;
      const response = await prisma.batches.update({
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

  async getAllBatch() {
    try {
      const response = await prisma.batches.findMany({
        include: {
          class: {
            select: {
              name: true,
            },
          },
        },
      });
      return response.sort((a, b) => {
        const numA = parseInt(a.class.name);
        const numB = parseInt(b.class.name);
        return numA - numB;
      });
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getAllBatchByClass(id) {
    try {
      const response = await prisma.batches.findMany({
        where: {
          class_id: id,
        },
        orderBy: {
          name: "asc",
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Batch Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getAllBatchesGroupByClass() {
    try {
      const response = await prisma.class.findMany({
        include: {
          batches: true,
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

  async getBatchById(id) {
    try {
      const response = await prisma.batches.findUnique({
        where: {
          id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Batch Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateBatch(data) {
    const { id, ...updates } = data;
    try {
      const response = await prisma.batches.update({
        where: {
          id: id,
        },
        data: updates,
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Batch Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteBatch(id) {
    try {
      const response = await prisma.batches.delete({
        where: {
          id: id,
        },
      });
      if (response === "null" || !response) {
        throw new ErrorHandler("Batch Nahi mil raha hai", 404);
      }
      return response;
    } catch (err) {
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new BatchServices();
