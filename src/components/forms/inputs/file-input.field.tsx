import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { IconWrapped, Input } from "~/components/ui/input";
import { Check, FileDown } from "lucide-react";
import { cn } from "~/lib/utils";
interface FileInputFieldProps extends React.ComponentProps<typeof Input> {
	name: string;
	label: string;
	multiple?: boolean;
	accept?: string;
}
export default function FileInputField({
	name,
	multiple,
	label,
	accept = "image/*, audio/*, video/*, application/*",
	...props
}: FileInputFieldProps) {
	const form = useFormContext();

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ fieldState, field }) => (
				<FormItem className={cn("flex flex-col gap-1", props.className)}>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<IconWrapped
							startIcon={{ Icon: <FileDown /> }}
							endIcon={
								!fieldState.error && (fieldState.isTouched || field.value)
									? { Icon: <Check className="text-green" /> }
									: undefined
							}
							className={cn(
								"border-current",
								!fieldState.error &&
									(fieldState.isTouched || field.value) &&
									"text-purple-700",
								fieldState.error && "text-red"
							)}
						>
							<Input
								type="file"
								multiple={multiple}
								placeholder={"photo.jpg"}
								accept={accept}
								{...props}
								className="rounded-none border-none bg-inherit p-0 outline-none"
								{...form.register(name)}
							/>
						</IconWrapped>
					</FormControl>
					<FormMessage className="text-sm text-red" />
				</FormItem>
			)}
		/>
	);
}
