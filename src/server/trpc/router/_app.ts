import { router } from "../trpc";
import { authRouter } from "./auth";
import { plosRouter } from "./plos";
import { courseRouter } from "./course";
import { typeRouter } from "./type";
import { questionRouter } from "./question";
export const appRouter = router({
  auth: authRouter,
  plos: plosRouter,
  course: courseRouter,
  type: typeRouter,
  question: questionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
