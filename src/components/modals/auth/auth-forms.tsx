import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import SignInForm from "~/components/forms/sign-in-form/sign-in.form";
import SignUpForm from "~/components/forms/sign-up-form/sign-up.form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ForgotPasswordForm from "../../forms/forgot-pass-form/forgot-pass.form";
import ResetPasswordForm from "../../forms/reset-pass-form/reset-pass.form";
import VerifyEmailForm from "../../forms/verify-email-form/verify-email.form";
import { Button } from "../../ui/button";

enum Step {
	SIGN_IN = "sign-in",
	SIGN_UP = "sign-up",
	VERIFY = "verify",
	FORGOT_PASS = "forgot-pass",
	RESET_PASS = "reset-pass",
}
interface StepProps {
	children: React.ReactNode;
	title: string;
	description?: string | React.ReactNode;
	onGoBack?: () => void;
}

function SubStep({ children, title, description, onGoBack }: StepProps) {
	return (
		<div className="h-full w-full flex flex-col gap-4">
			<div className="flex flex-wrap items-center">
				{onGoBack && (
					<Button onClick={onGoBack} variant={"link"} className="w-fit">
						<ArrowLeft />
					</Button>
				)}
				<h3 className="text-center grow mr-8">{title}</h3>
			</div>
			{description && <p className="mb-2 text-center">{description}</p>}
			{children}
		</div>
	);
}

export default function AuthForms() {
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [step, setStep] = useState<Step>(Step.SIGN_IN);

	if (step === Step.VERIFY) {
		return (
			<SubStep
				title="Verify your email"
				description="We have sent email to you with 6-digits code"
				onGoBack={() => setStep(Step.SIGN_UP)}
			>
				<VerifyEmailForm
					defaultValues={{ email }}
					onSuccess={() => setStep(Step.SIGN_IN)}
				/>
			</SubStep>
		);
	}

	if (step === Step.FORGOT_PASS) {
		return (
			<SubStep
				title="Forgot password"
				description="Enter your email to reset password"
				onGoBack={() => setStep(Step.SIGN_IN)}
			>
				<ForgotPasswordForm
					defaultValues={{ email }}
					onSuccess={(data) => {
						setStep(Step.RESET_PASS);
						setEmail(data.email);
					}}
				/>
			</SubStep>
		);
	}

	if (step === Step.RESET_PASS) {
		return (
			<SubStep
				title="Reset password"
				description="Enter your email and new password"
				onGoBack={() => setStep(Step.FORGOT_PASS)}
			>
				<ResetPasswordForm
					defaultValues={{ email }}
					onSuccess={(data) => {
						setStep(Step.SIGN_IN);
						setEmail(data.email);
						setPassword(data.password);
					}}
				/>
			</SubStep>
		);
	}

	return (
		<Tabs
			defaultValue={step}
			value={step}
			className="flex size-full flex-col gap-4"
			onValueChange={(v) =>
				setStep(v === Step.SIGN_IN ? Step.SIGN_IN : Step.SIGN_UP)
			}
		>
			<h3 className="text-center">
				{step === Step.SIGN_IN ? "Welcome back!" : "Register now!"}
			</h3>
			<TabsList className="w-full *:basis-1/2">
				<TabsTrigger value={Step.SIGN_IN}>Sign In</TabsTrigger>
				<TabsTrigger value={Step.SIGN_UP}>Sign Up</TabsTrigger>
			</TabsList>
			<div className="h-full *:h-full">
				<TabsContent value={Step.SIGN_IN}>
					<SignInForm
						defaultValues={{ email, password }}
						onForgotPassword={() => setStep(Step.FORGOT_PASS)}
					/>
				</TabsContent>
				<TabsContent value={Step.SIGN_UP}>
					{step === Step.SIGN_UP && (
						<SignUpForm
							onSuccess={(data) => {
								setEmail(data.email);
								setPassword(data.password);
								setStep(Step.VERIFY);
							}}
						/>
					)}
				</TabsContent>
			</div>
		</Tabs>
	);
}
