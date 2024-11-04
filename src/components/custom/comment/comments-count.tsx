import { MessageSquareText } from "lucide-react";
import { Link } from "~/components/custom/link";

interface CommentsCountProps {
	post: { id: number; commentsCount?: number };
}
export function CommentsCount({ post }: CommentsCountProps) {
	return (
		<Link
			className="flex gap-1 hover:text-blue-500 transition-colors"
			to={`/posts/${post.id}#comments`}
		>
			<span>{post.commentsCount || 0}</span>
			<MessageSquareText />
		</Link>
	);
}
