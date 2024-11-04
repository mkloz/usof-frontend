import { CircleArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useWindowScroll } from "@uidotdev/usehooks";
import { Button } from "~/components/ui/button";

export default function ScrollTop() {
	const [opacity, setOpacity] = useState(0);
	const [scroll, scrollTo] = useWindowScroll();

	useEffect(() => {
		if (scroll.y === null) return;
		const height = document.documentElement.scrollHeight - window.innerHeight;

		setOpacity(1 - (height - scroll.y || 0) / height - 0.5);
	}, [scroll]);

	return (
		<Button
			onClick={() => {
				scrollTo({
					top: 0,
					behavior: "smooth",
				});
			}}
			variant={"link"}
			className="fixed bottom-8 left-2/3 rounded-full text-current transition-opacity"
			style={{ opacity: opacity || 0 }}
		>
			<CircleArrowUp size={48} />
		</Button>
	);
}
