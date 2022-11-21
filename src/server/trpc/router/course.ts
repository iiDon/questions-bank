import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const courseRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user) {
      throw new Error("You must be logged in to get all courses");
    }

    return ctx.prisma.course.findMany();
  }),
  createCourse: publicProcedure
    .input(
      z
        .object({
          name: z.string(),
        })
        .nullish()
    )
    .mutation(({ input, ctx }) => {
      if (!input) {
        throw new Error("Invalid input");
      }

      if (!ctx.session?.user) {
        throw new Error("You must be logged in to create a course");
      }

      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("You must be an admin to create a course");
      }

      const { name } = input;

      const course = ctx.prisma.course.create({
        data: {
          name,
        },
      });

      return course;
    }),

  updateCourse: publicProcedure
    .input(
      z
        .object({
          id: z.string(),
          name: z.string(),
        })
        .nullish()
    )
    .mutation(({ input, ctx }) => {
      if (!input) {
        throw new Error("Invalid input");
      }

      if (!ctx.session?.user) {
        throw new Error("You must be logged in to update a course");
      }

      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("You must be an admin to update a course");
      }

      const { id, name } = input;

      const course = ctx.prisma.course.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });

      return course;
    }),

  deleteCourse: publicProcedure
    .input(
      z
        .object({
          id: z.string(),
        })
        .nullish()
    )
    .mutation(({ input, ctx }) => {
      if (!input) {
        throw new Error("Invalid input");
      }

      if (!ctx.session?.user) {
        throw new Error("You must be logged in to delete a course");
      }

      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("You must be an admin to delete a course");
      }

      const { id } = input;

      const course = ctx.prisma.course.delete({
        where: {
          id,
        },
      });

      return course;
    }),
});
