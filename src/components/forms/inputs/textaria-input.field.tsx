import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";

interface TextareaInputFieldProps extends ComponentProps<typeof Textarea> {
	name: string;
	label?: string;
}

export function TextareaInputField({
	name,
	label,
	...props
}: TextareaInputFieldProps) {
	const form = useFormContext();
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Textarea className="resize-none" {...field} {...props} />
					</FormControl>
					<FormMessage className="text-sm text-red" />
				</FormItem>
			)}
		/>
	);
}
