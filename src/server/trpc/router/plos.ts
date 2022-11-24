import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const plosRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user) {
      throw new Error("You must be logged in to get all PLos");
    }

    return ctx.prisma.pLOs.findMany();
  }),
  createPLO: publicProcedure

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
        throw new Error("You must be logged in to create a PLO");
      }

      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("You must be an admin to create a PLO");
      }

      const { name } = input;

      const plo = ctx.prisma.pLOs.create({
        data: {
          name,
        },
      });

      return plo;
    }),

  updatePLO: publicProcedure
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
        throw new Error("You must be logged in to update a PLO");
      }

      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("You must be an admin to update a PLO");
      }

      const { id, name } = input;

      const plo = ctx.prisma.pLOs.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });

      return plo;
    }),

  deletePLO: publicProcedure

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
        throw new Error("You must be logged in to delete a PLO");
      }

      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("You must be an admin to delete a PLO");
      }

      const { id } = input;

      const plo = ctx.prisma.pLOs.delete({
        where: {
          id,
        },
      });

      return plo;
    }),
  // createManyPLOs: publicProcedure
  //   .input(
  //     z.array(
  //       z.object({
  //         name: z.string(),
  //       })
  //     )
  //   )
  //   .mutation(async ({ input, ctx }) => {
  //     if (!input) {
  //       throw new Error("Invalid input");
  //     }

  //     for (const name of input) {
  //       await ctx.prisma.pLOs.create({
  //         data: {
  //           name: name.name,
  //         },
  //       });
  //     }
  //   }),
});
