export class ConverterUtils {
	static remToPixels(rem: number | string): number {
		let value: number;

		if (typeof rem === "string") {
			value = parseFloat(rem.replace(/rem/g, ""));
		} else {
			value = rem;
		}
		if (isNaN(value)) {
			return 0;
		}
		const fontSize = parseFloat(
			getComputedStyle(document.documentElement).fontSize
		);
		return value * fontSize;
	}
}
