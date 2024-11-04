import { z } from "zod";

export const FileValidator = z.object({
	id: z.number(),
	name: z.string(),
	url: z.string().nullable(),
	createdAt: z.coerce.date(),
});

export type IFile = z.infer<typeof FileValidator>;
