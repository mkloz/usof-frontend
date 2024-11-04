import { PropsWithChildren } from "react";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import { AuthModal } from "../../modals/auth/auth.modal";
import ScrollTop from "~/components/custom/scroll-top";

export default function ContentLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex flex-col min-h-screen">
			<AuthModal />
			<Navbar />
			<div className="flex w-full grow self-stretch shrink-0">
				{children}
				<Outlet />
			</div>
			<ScrollTop />
		</div>
	);
}
