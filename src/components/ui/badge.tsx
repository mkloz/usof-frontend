import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border-2 border-border-primary px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:focus:ring-neutral-300",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-neutral-900 text-neutral-50 hover:bg-neutral-900/80 dark:bg-neutral-50 dark:text-neutral-900",
				secondary: "bg-bg-secondary text-text-secondary border-text-secondary",
				outline:
					"bg-transparent text-text-primary border-text-primary hover:bg-neutral-900 hover:text-neutral-50",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div
			className={cn(badgeVariants({ variant, className }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
