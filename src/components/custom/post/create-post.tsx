import { useQueryClient } from "@tanstack/react-query";
import { ChevronsDownUp, ChevronsUpDown, SquarePlus } from "lucide-react";
import { useToggle } from "usehooks-ts";
import PostForm from "~/components/forms/new-post-form/post.form";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { PostStatus } from "~/types/post";

export function CreatePost() {
	const [isOpen, toggle] = useToggle(false);
	const queryClient = useQueryClient();

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={toggle}
			className="p-4 bg-bg-secondary m-2 rounded-xl flex flex-col"
		>
			<CollapsibleTrigger className="flex justify-center">
				<h2 className="text-center flex items-center gap-2">
					<SquarePlus />
					<h3 className="text-xl font-bold text-center">Create Post</h3>
					{isOpen ? <ChevronsDownUp /> : <ChevronsUpDown />}
				</h2>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className=" min-w-xs flex flex-col gap-6">
					<PostForm
						defaultValues={{ status: PostStatus.PUBLISHED }}
						onSuccess={() => {
							queryClient.invalidateQueries({ queryKey: ["posts"] });
						}}
					/>
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}
