import { prisma } from "@prisma/client";
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  register: publicProcedure
    .input(
      z
        .object({
          name: z.string(),
          email: z.string(),
          password: z.string(),
          role: z.string(),
        })
        .nullish()
    )
    .mutation(({ input, ctx }) => {
      if (!input) {
        throw new Error("Invalid input");
      }

      if (!ctx.session?.user) {
        throw new Error("You must be logged in to register");
      }

      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("You must be an admin to register");
      }

      const { name, email, password, role } = input;

      const user = ctx.prisma.user.create({
        data: {
          email,
          password,
          name,
          role,
        },
      });

      return user;
    }),
});
