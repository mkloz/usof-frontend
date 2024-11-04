import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { useTheme } from "~/stores/theme.store";

export const queryClient = new QueryClient();

function AppProvider({ children }: PropsWithChildren) {
	useTheme();

	return (
		<QueryClientProvider client={queryClient}>
			<Toaster />
			{children}
		</QueryClientProvider>
	);
}
export default AppProvider;
