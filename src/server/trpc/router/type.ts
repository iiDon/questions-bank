import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const typeRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user) {
      throw new Error("You must be logged in to get all types");
    }
    return ctx.prisma.type.findMany();
  }),
  createType: publicProcedure
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
        throw new Error("You must be logged in to create a type");
      }

      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("You must be an admin to create a type");
      }

      const { name } = input;

      const type = ctx.prisma.type.create({
        data: {
          name,
        },
      });

      return type;
    }),
  updatetype: publicProcedure
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
        throw new Error("You must be logged in to update a type");
      }

      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("You must be an admin to update a type");
      }

      const { id, name } = input;

      const type = ctx.prisma.type.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });

      return type;
    }),

  deleteType: publicProcedure

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
        throw new Error("You must be logged in to delete a type");
      }

      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("You must be an admin to delete a type");
      }

      const { id } = input;

      const type = ctx.prisma.type.delete({
        where: {
          id,
        },
      });

      return type;
    }),
});
