import { z } from "zod";

export const Post = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});
