import React, { ElementType } from "react";
import { HashLink } from "react-router-hash-link";
import { cn } from "../../lib/utils";
import { ConverterUtils } from "../../utils/converter.utils";

interface ConditionalLinkProps
	extends Omit<React.ComponentProps<typeof HashLink>, "to"> {
	to?: string;
	as?: ElementType;
}

export const ConditionalLink: React.FC<ConditionalLinkProps> = ({
	to,
	as = "div",
	...rest
}) => {
	const Wrapper = to ? Link : as;

	return <Wrapper {...rest} to={to} />;
};

export function Link({
	onClick,
	...props
}: React.ComponentProps<typeof HashLink>) {
	const getTopOffset = () => {
		const rem = getComputedStyle(document.documentElement).getPropertyValue(
			"--header-height"
		);
		return ConverterUtils.remToPixels(rem);
	};

	const scrollWithOffset = (el: HTMLElement) => {
		const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;

		window.scrollTo({ top: yCoordinate - getTopOffset(), behavior: "smooth" });
	};

	return (
		<HashLink
			scroll={(el) => scrollWithOffset(el)}
			{...props}
			onClick={(e) => {
				onClick?.(e);
				if (
					props.to !== window.location.pathname &&
					!props.to.toString().includes("#")
				)
					window.scrollTo(0, 0);
			}}
			className={cn(
				"rounded-md ring-offset-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 ",
				props.className
			)}
		/>
	);
}
