import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { IconWrapped, Input } from "~/components/ui/input";
import { CalendarDays } from "lucide-react";
import { cn } from "~/lib/utils";

interface NumberInputFieldProps extends React.ComponentProps<typeof Input> {
	name: string;
	label: string;
}

export default function DateInputField({
	name,
	label,
	placeholder,
	...props
}: NumberInputFieldProps) {
	const form = useFormContext();

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ fieldState, field }) => (
				<FormItem
					className={cn("flex flex-col gap-1 grow min-w-40", props.className)}
				>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<IconWrapped
							startIcon={{ Icon: <CalendarDays /> }}
							className={cn(
								"border-current",
								!fieldState.error &&
									(fieldState.isTouched || field.value) &&
									"text-purple-700",
								fieldState.error && "text-red"
							)}
						>
							<Input
								type="date"
								placeholder={placeholder}
								{...props}
								className="rounded-none border-none bg-inherit p-0 outline-none grow"
								{...form.register(name, {})}
							/>
						</IconWrapped>
					</FormControl>
					<FormMessage className="text-sm text-red" />
				</FormItem>
			)}
		/>
	);
}
