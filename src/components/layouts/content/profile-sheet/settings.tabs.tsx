import UpdatePasswordForm from "~/components/forms/update-pass-form/update-pass.form";
import UpdateUserForm from "~/components/forms/update-user-form/update-user.form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

enum SettingsTab {
	ACCOUNT = "account",
	PASSWORD = "password",
}
export function SettingsTabs() {
	return (
		<Tabs
			defaultValue={SettingsTab.ACCOUNT}
			className="p-8 w-[26rem] basis-full flex-shrink flex flex-col"
		>
			<TabsList>
				<TabsTrigger value={SettingsTab.ACCOUNT} className="w-full">
					Account
				</TabsTrigger>
				<TabsTrigger value={SettingsTab.PASSWORD} className="w-full">
					Password
				</TabsTrigger>
			</TabsList>
			<TabsContent
				value={SettingsTab.ACCOUNT}
				className="flex flex-col items-center w-full h-full"
			>
				<UpdateUserForm />
			</TabsContent>
			<TabsContent
				value={SettingsTab.PASSWORD}
				className="flex flex-col items-center w-full h-full "
			>
				<UpdatePasswordForm />
			</TabsContent>
		</Tabs>
	);
}
