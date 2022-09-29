/**
 * This file contains the root router of your tRPC-backend
 */
import { t } from '../trpc';
import { postRouter } from './post';
//  import { healthRouter } from './health';

export const appRouter = t.router({
  post: postRouter,
  //    health: healthRouter,
});

// Export only the **type** of a router to avoid importing server code on the client
export type AppRouter = typeof appRouter;
