import { Trash } from "lucide-react";
import { ComponentProps } from "react";
import { Button } from "~/components/ui/button";

interface DeleteButtonProps extends ComponentProps<typeof Button> {
	onDelete: () => void;
}

export default function DeleteButton({
	onDelete,
	...props
}: DeleteButtonProps) {
	return (
		<Button
			variant={"link"}
			title={"Delete"}
			{...props}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				props.onClick?.(e);
				onDelete();
			}}
		>
			<Trash className="hover:text-red" />
			<p className="sr-only">Delete</p>
		</Button>
	);
}
