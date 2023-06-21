import dotenv from 'dotenv';


dotenv.config();

class Config {
	public MONGODB_URL: string ;
	public JWT_SECRET: string;
	public PORT: number | undefined

	constructor() {
		this.MONGODB_URL = process.env.MONGODB_URL || '';
		this.JWT_SECRET = process.env.JWT_TOKEN || '1234';
	}

	public validateConfig(): void {
		for (const [key, value] of Object.entries(this)) {
			if (value === undefined) {
				throw new Error(`Configuration ${key} is undefined`);
			}
		}
	}
}

export const config: Config = new Config();