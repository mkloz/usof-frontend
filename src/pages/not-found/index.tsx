import NotFound from "~/components/async/errors/not-found.error";
import { Sidebar } from "~/components/layouts/content/sidebar";

export default function NotFoundPage() {
	return (
		<div className="w-full flex flex-row">
			<div className="hidden md:flex sticky top-header bottom-0 max-w-xs w-full h-full min-w-fit max-h-screen-no-header p-2 overflow-y-auto border-r-2">
				<Sidebar />
			</div>
			<main className="flex min-w-xs w-full h-full flex-col grow basis-md">
				<NotFound />
			</main>
		</div>
	);
}
