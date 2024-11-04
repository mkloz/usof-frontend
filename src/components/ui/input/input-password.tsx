import { ComponentProps } from "react";
import { IconWrapped, Input } from "./input";
import { SquareAsterisk } from "lucide-react";
import { ScanEye } from "lucide-react";
import React from "react";
import { useToggle } from "usehooks-ts";

interface InputPasswordProps extends ComponentProps<typeof Input> {
	endIcon?: ComponentProps<typeof IconWrapped>["endIcon"];
}

export const InputPassword = React.forwardRef<
	HTMLInputElement,
	InputPasswordProps
>(({ endIcon, className, ...props }: InputPasswordProps, ref) => {
	const [showPassword, toggleVisibility] = useToggle(false);
	return (
		<IconWrapped
			startIcon={{
				Icon: showPassword ? <SquareAsterisk /> : <ScanEye />,
				onClick: toggleVisibility,
			}}
			className={className}
			endIcon={endIcon}
		>
			<Input
				type={showPassword ? "text" : "password"}
				placeholder={"**********"}
				autoComplete="current-password"
				{...props}
				className="select-none rounded-none border-none bg-inherit p-0 outline-none"
				ref={ref}
			/>
		</IconWrapped>
	);
});

InputPassword.displayName = "InputPassword";
