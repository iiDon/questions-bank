import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const questionRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user) {
      throw new Error("You must be logged in to get all courses");
    }

    if (ctx.session.user.role !== "ADMIN") {
      const question = await ctx.prisma.question.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          user: true,
          course: true,
          PLOs: true,
          type: true,
        },
      });
      return question.reverse();
    }
    // get all questions with all courses details

    const questions = await ctx.prisma.question.findMany({
      include: {
        course: true,
        PLOs: true,
        type: true,
        user: true,
      },
    });

    // reverse the order of the questions
    return questions.reverse();
  }),
  createQuestion: publicProcedure
    .input(
      z.object({
        course: z.string(),
        PLOs: z.string(),
        CLOs: z.string(),
        type: z.string(),
        question: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!input) {
        throw new Error("Invalid input");
      }

      if (!ctx.session?.user) {
        throw new Error("You must be logged in to create a course");
      }

      console.log(ctx.session?.user?.id, " iD");
      const { course, PLOs, CLOs, type, question } = input;

      const Q = await ctx.prisma.question.create({
        data: {
          user: {
            connect: { id: ctx.session.user.id },
          },
          course: {
            connect: { id: course },
          },
          PLOs: {
            connect: { id: PLOs },
          },
          CLOs,
          type: {
            connect: { id: type },
          },
          question: question,
        },
      });

      // console.log(Q);

      return Q;
    }),
  updateQuestion: publicProcedure
    .input(
      z.object({
        id: z.string(),
        course: z.string(),
        PLOs: z.string(),
        CLOs: z.string(),
        type: z.string(),
        question: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      if (!input) {
        throw new Error("Invalid input");
      }

      if (!ctx.session?.user) {
        throw new Error("You must be logged in to update a question");
      }

      // if (ctx.session.user.role !== "ADMIN") {
      //   throw new Error("You must be an admin to update a question");
      // }

      const { id, course, PLOs, CLOs, type, question } = input;

      const Q = ctx.prisma.question.update({
        where: {
          id,
        },
        data: {
          course: {
            connect: {
              id: course,
            },
          },
          PLOs: {
            connect: {
              id: PLOs,
            },
          },
          CLOs,
          type: {
            connect: {
              id: type,
            },
          },
          question: question,
        },
      });

      return Q;
    }),

  deleteQuestion: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      if (!input) {
        throw new Error("Invalid input");
      }

      if (!ctx.session?.user) {
        throw new Error("You must be logged in to delete a question");
      }

      // if (ctx.session.user.role !== "ADMIN") {
      //   throw new Error("You must be an admin to delete a question");
      // }

      const userCreator = ctx.prisma.question.findUnique({
        where: {
          id: input.id,
        },
        select: {
          user: true,
        },
      });

      if (!userCreator) {
        throw new Error("Invalid question");
      }

      if (
        userCreator.user.name !== ctx.session.user.id &&
        ctx.session.user.role !== "ADMIN"
      ) {
        throw new Error(
          "You must be the creator or an admin to delete a question"
        );
      }

      const { id } = input;

      const course = ctx.prisma.question.delete({
        where: {
          id,
        },
      });

      return course;
    }),
});
