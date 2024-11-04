import { Logo } from "../../icons/logos/logo";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "../../ui/dialog";
import { useAuthModal } from "./auth-modal.store";
import AuthForms from "./auth-forms";

export function Auth() {
	return (
		<div className="flex min-h-[37rem] w-[60rem] max-w-full grow justify-center overflow-hidden rounded-4xl border-none bg-bg-secondary">
			<div className="flex w-full min-w-72 max-w-[30rem] basis-full items-center justify-center border-none p-5 sm:p-10 md:basis-1/2">
				<AuthForms />
			</div>
			<div className="hidden md:flex md:basis-1/2 items-center justify-center ">
				<div className="flex flex-col items-center">
					<Logo className="w-64 h-64" />
					<h1 className="w-full text-8xl">USOF</h1>
				</div>
			</div>
		</div>
	);
}

export function AuthModal({ children }: { children?: React.ReactNode }) {
	const modal = useAuthModal();

	return (
		<Dialog
			open={modal.isOpen}
			onOpenChange={(v: boolean) => {
				modal.set(v);
			}}
		>
			<DialogTitle className="sr-only">Sign In</DialogTitle>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogDescription />
			<DialogContent>
				<DialogTitle className="sr-only">Sign In </DialogTitle>
				<Auth />
			</DialogContent>
		</Dialog>
	);
}
