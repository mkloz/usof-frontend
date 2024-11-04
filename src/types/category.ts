import { z } from "zod";

export const CategoryValidator = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	_count: z.object({ posts: z.number().nonnegative().optional() }).optional(),
});

export type ICategory = z.infer<typeof CategoryValidator>;
