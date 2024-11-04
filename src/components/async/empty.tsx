import { Inbox, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
interface EmptyProps {
	message?: string;
	onReload?: () => void;
	isReloading?: boolean;
}
export function Empty({
	message = "No data",
	onReload,
	isReloading = false,
}: EmptyProps) {
	const navigate = useNavigate();
	if (!onReload) {
		onReload = () => navigate(0);
	}
	return (
		<div className="flex w-full grow items-center min-h-20 justify-center self-stretch text-text-disabled">
			<div className="m-auto flex w-[40%] flex-wrap gap-2 justify-center">
				<div className="m-auto min-h-full basis-auto">
					<Inbox size={"6rem"} className="h-full w-auto" />
				</div>
				<div className="m-auto flex flex-col justify-around gap-2">
					<h2 className="text-center">{message}</h2>
					<Button
						variant={"ghost"}
						onClick={onReload}
						className="gap-3 text-text-disabled text-lg"
					>
						<RefreshCw
							size="1.5rem"
							className={cn(isReloading && "animate-spin ")}
						/>
						Reload
					</Button>
				</div>
			</div>
		</div>
	);
}
