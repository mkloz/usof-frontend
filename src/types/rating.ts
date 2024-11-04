import { z } from "zod";
import { CommentValidator, IComment } from "./comment";
import { IPost, PostValidator } from "./post";

export enum RatingType {
	LIKE = "LIKE",
	DISLIKE = "DISLIKE",
}

// export const RatingValidator = z.object({
// 	id: z.number(),
// 	createdAt: z.date(),
// 	postId: z.number().nullable(),
// 	userId: z.number(),
// 	type: z.nativeEnum(RatingType),
// 	commentId: z.number().nullable(),

// 	post: PostValidator.optional(),
// 	comment: CommentValidator.optional(),
// });

const BaseRatingValidator = z.object({
	id: z.number(),
	createdAt: z.coerce.date(),
	postId: z.number().nullable(),
	userId: z.number(),
	type: z.nativeEnum(RatingType),
	commentId: z.number().nullable(),
});

export const RatingValidator: z.ZodType<
	z.infer<typeof BaseRatingValidator> & {
		post?: IPost | null;
		comment?: IComment | null;
	}
> = BaseRatingValidator.extend({
	post: z.lazy(() => PostValidator.optional().nullable()),
	comment: z.lazy(() => CommentValidator.optional().nullable()),
});
export type IRating = z.infer<typeof RatingValidator>;
