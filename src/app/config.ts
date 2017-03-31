export const CARBON_PROTOCOL:string = process.env.carbon.protocol;
export const CARBON_DOMAIN:string = process.env.carbon.domain;
export const DEBUG:boolean = process.env.ENV !== "production";
export const CARBON_APP_SLUG:string = process.env.carbon.app.slug;

export function BASE_URL(): string {
	return process.env.baseUrl
}
