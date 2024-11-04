import EmojiPicker, {
	EmojiClickData,
	SuggestionMode,
} from "emoji-picker-react";
import { SmilePlus } from "lucide-react";
import { ComponentProps } from "react";
import { Button } from "~/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { useTheme } from "~/stores/theme.store";

interface AddEmojiProps extends ComponentProps<typeof EmojiPicker> {
	onEmojiClick: (emoji: EmojiClickData, e: MouseEvent) => void;
}

export function AddEmoji({ onEmojiClick, ...props }: AddEmojiProps) {
	const theme = useTheme();

	return (
		<Popover>
			<PopoverTrigger>
				<Button
					type="button"
					variant={"link"}
					className="btn-secondary font-medium transition-transform "
				>
					<SmilePlus />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="border-none bg-transparent shadow-none w-min">
				<EmojiPicker
					theme={theme.theme}
					allowExpandReactions
					reactionsDefaultOpen
					suggestedEmojisMode={SuggestionMode.FREQUENT}
					skinTonesDisabled
					onEmojiClick={onEmojiClick}
					{...props}
				/>
			</PopoverContent>
		</Popover>
	);
}
