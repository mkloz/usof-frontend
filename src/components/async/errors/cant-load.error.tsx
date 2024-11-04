import { ServerOff } from "lucide-react";

function CantLoadError() {
	return (
		<div className="flex grow w-full self-stretch h-full">
			<div className="m-auto flex w-[40%] flex-wrap items-center justify-center gap-2">
				<ServerOff size="2rem" />
				<h6 className="text-center">Can&apos;t load data</h6>
			</div>
		</div>
	);
}
export default CantLoadError;
