import { z } from "zod";

export const IdValidator = z.object({
	id: z.coerce.number().positive(),
});
