import { Edit, Save } from "lucide-react";
import { ComponentProps } from "react";
import { Button } from "~/components/ui/button";

interface EditButtonProps extends ComponentProps<typeof Button> {
	editable: boolean;
	onEdit: () => void;
	onSaveChanges: () => void;
}

export default function EditButton({
	onEdit,
	onSaveChanges,
	editable,
	...props
}: EditButtonProps) {
	return (
		<Button
			variant={"link"}
			title={editable ? "Save changes" : "Edit"}
			{...props}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				props.onClick?.(e);
				if (editable) {
					return onSaveChanges();
				}
				onEdit();
			}}
		>
			{editable ? (
				<Save className="hover:text-green" />
			) : (
				<Edit className="hover:text-blue-700" />
			)}
			<p className="sr-only">{editable ? "Save" : "Edit"}</p>
		</Button>
	);
}
