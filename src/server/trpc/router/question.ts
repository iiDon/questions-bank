import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const questionRouter = router({
  getAll: publicProcedure
    .input(
      z
        .object({
          PLOs: z.string().optional(),
          Types: z.string().optional(),
          Courses: z.string().optional(),
        })
        .nullish()
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.session?.user) {
        throw new Error("You must be logged in to get all courses");
      }

      if (ctx.session.user.role !== "ADMIN") {
        const question = await ctx.prisma.question.findMany({
          where: {
            userId: ctx.session.user.id,
            PLOsId: input?.PLOs ? input.PLOs : undefined,
            typeId: input?.Types ? input.Types : undefined,
            courseId: input?.Courses ? input.Courses : undefined,
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
        where: {
          PLOsId: input?.PLOs ? input.PLOs : undefined,
          typeId: input?.Types ? input.Types : undefined,
          courseId: input?.Courses ? input.Courses : undefined,
        },
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

      return Q;
    }),
  updateQuestion: publicProcedure
    .input(
      z
        .object({
          id: z.string(),
          course: z.string(),
          PLOs: z.string(),
          CLOs: z.string(),
          type: z.string(),
          question: z.string(),
        })
        .nullish()
    )
    .mutation(async ({ input, ctx }) => {
      if (!input) {
        throw new Error("Invalid input");
      }

      if (!ctx.session?.user) {
        throw new Error("You must be logged in to update a question");
      }

      const { id, course, PLOs, CLOs, type, question } = input;

      const Q = await ctx.prisma.question.update({
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
    }),

  deleteQuestion: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!input) {
        throw new Error("Invalid input");
      }

      if (!ctx.session?.user) {
        throw new Error("You must be logged in to delete a question");
      }

      // if (ctx.session.user.role !== "ADMIN") {
      //   throw new Error("You must be an admin to delete a question");
      // }

      // get the user who created the question
      const userCreator = await ctx.prisma.question.findUnique({
        where: {
          id: input.id,
        },
        select: {
          userId: true,
        },
      });

      if (!userCreator) {
        throw new Error("Invalid question");
      }

      if (userCreator.userId !== ctx.session.user.id) {
        throw new Error("You can only delete your own questions");
      }

      const { id } = input;

      const course = ctx.prisma.question.delete({
        where: {
          id,
        },
      });

      return course;
    }),
  deleteManyQuestions: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) {
        throw new Error("You must be logged in to get all courses");
      }

      if (ctx.session.user.role !== "ADMIN") {
        const question = await ctx.prisma.question.deleteMany({
          where: {
            userId: ctx.session.user.id,
            id: {
              in: input.ids,
            },
          },
        });

        return question;
      }

      const { ids } = input;

      const question = await ctx.prisma.question.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      return question;
    }),
  createManyQuestions: publicProcedure
    .input(
      z.array(
        z.object({
          CLOs: z.string(),
          Courses: z.string(),
          PLOs: z.string(),
          Types: z.string(),
          Question: z.string(),
        })
      )
    )
    .mutation(async ({ input, ctx }) => {
      if (!input) {
        throw new Error("Invalid input");
      }

      if (!ctx.session?.user) {
        throw new Error("You must be logged in to create a course");
      }

      const questions = input;
      for (let question = 0; question < questions.length; question++) {
        // check if the course exists
        const course = await ctx.prisma.course.findFirst({
          where: {
            name: questions[question]?.Courses || "",
          },
        });

        if (!course) {
          throw new Error("Invalid course");
        }

        const courseId = course.id;

        // check if the PLO exists
        const PLO = await ctx.prisma.pLOs.findFirst({
          where: {
            name: questions[question]?.PLOs,
          },
        });

        if (!PLO) {
          throw new Error("Invalid PLO");
        }

        const PLOId = PLO.id;

        // check if the type exists
        const type = await ctx.prisma.type.findFirst({
          where: {
            name: questions[question]?.Types,
          },
        });

        if (!type) {
          throw new Error("Invalid type");
        }

        const typeId = type.id;

        await ctx.prisma.question.create({
          data: {
            user: {
              connect: { id: ctx.session.user.id },
            },
            course: {
              connect: { id: courseId },
            },
            PLOs: {
              connect: { id: PLOId },
            },
            type: {
              connect: { id: typeId },
            },
            CLOs: questions[question]?.CLOs || "",
            question: questions[question]?.Question || "",
          },
        });
      }
    }),
});
