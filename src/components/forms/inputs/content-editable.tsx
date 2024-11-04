import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

type PolymorphicProps<E extends React.ElementType> = React.PropsWithChildren<
	React.ComponentPropsWithoutRef<E> & {
		as?: E;
	}
>;

type ContentEditableProps<T extends React.ElementType> = PolymorphicProps<T> & {
	value?: string;
	placeholder?: string;
	isEditable: boolean;
	onValueChange?: (value: string) => void;
};

export default function ContentEditable<T extends React.ElementType = "div">({
	isEditable = true,
	value = "",
	onValueChange,
	as,
	...props
}: ContentEditableProps<T>) {
	const Component = as || "div";
	const ref = useRef<HTMLDivElement>(null);

	if (!value && typeof props.children === "string") value = props.children;

	useEffect(() => {
		if (ref.current) {
			ref.current.textContent = value;
		}
	}, [value]);

	useEffect(() => {
		if (ref.current) {
			ref.current.focus();
		}
	}, [isEditable]);

	return (
		<Component
			contentEditable={isEditable}
			onFocus={(event: { currentTarget: Node }) => {
				const range = document.createRange();
				range.selectNodeContents(event.currentTarget);
				const selection = window.getSelection();
				selection?.removeAllRanges();
				selection?.addRange(range);
			}}
			{...props}
			className={cn(
				"focus:border-none focus:outline-none",
				isEditable && "animate-pulse",
				props.className
			)}
			onInput={(event: React.FormEvent<HTMLDivElement>) => {
				const textContent = event.currentTarget.textContent;
				if (textContent !== value) {
					onValueChange?.(textContent || "");
				}
			}}
			ref={ref}
		/>
	);
}
