import { z } from "zod";
import { EmailValidator } from "~/utils/validators/email.validator";
import { FullNameValidator } from "~/utils/validators/full-name.validator";
import { CommentValidator, IComment } from "./comment";
import { FileValidator, IFile } from "./file";
import { IPost, PostValidator } from "./post";
import { IRating, RatingValidator } from "./rating";

export enum UserRole {
	USER = "USER",
	ADMIN = "ADMIN",
}

const BaseUserValidator = z.object({
	id: z.number(),
	email: EmailValidator.optional(),
	fullName: FullNameValidator,
	passwordHash: z.string().optional(),
	emailVerified: z.boolean(),
	rating: z.number().nullable(),
	role: z.nativeEnum(UserRole),
	avatarId: z.number().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export const UserValidator: z.ZodType<
	z.infer<typeof BaseUserValidator> & {
		posts?: IPost[];
		avatar?: IFile | null;
		ratings?: IRating[];
		comments?: IComment[];
	}
> = BaseUserValidator.extend({
	posts: z.lazy(() => z.array(PostValidator).optional()),
	avatar: FileValidator.nullable(),
	ratings: z.lazy(() => z.array(RatingValidator).optional()),
	comments: z.lazy(() => z.array(CommentValidator).optional()),
});

export type IUser = z.infer<typeof UserValidator>;
