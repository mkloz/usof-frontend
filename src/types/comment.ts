import { z } from "zod";
import { IUser, UserValidator } from "./user";

const BaseCommentValidator = z.object({
	id: z.number(),
	userId: z.number(),
	content: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	rating: z.number().nullable(),
	postId: z.number(),
	_count: z
		.object({
			subComments: z.number().int().nonnegative().optional(),
		})
		.optional(),
});

export const CommentValidator: z.ZodType<
	z.infer<typeof BaseCommentValidator> & {
		user?: IUser | null;
	}
> = BaseCommentValidator.extend({
	user: z.lazy(() => UserValidator.optional().nullable()),
});

export type IComment = z.infer<typeof CommentValidator>;
