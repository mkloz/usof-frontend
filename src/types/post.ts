import { z } from "zod";
import { FileValidator, IFile } from "./file";
import { IUser, UserValidator } from "./user";

export enum PostStatus {
	DRAFT = "DRAFT",
	PUBLISHED = "PUBLISHED",
	ARCHIVED = "ARCHIVED",
	PRIVATE = "PRIVATE",
}
const BasePostValidator = z.object({
	id: z.number(),
	title: z.string(),
	content: z.string(),
	authorId: z.number().nullable(),
	status: z.nativeEnum(PostStatus),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	rating: z.number().nullable(),
	_count: z
		.object({
			comments: z.number().int().nonnegative().optional(),
		})
		.optional(),
});

export const PostValidator: z.ZodType<
	z.infer<typeof BasePostValidator> & {
		pictures?: IFile[];
		author?: IUser | null;
	}
> = BasePostValidator.extend({
	pictures: z.lazy(() => z.array(FileValidator).optional()),
	author: z.lazy(() => UserValidator.optional().nullable()),
});

export type IPost = z.infer<typeof PostValidator>;
