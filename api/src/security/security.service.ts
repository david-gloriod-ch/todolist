import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Request } from 'express';
import * as requestIp from 'request-ip';
import * as useragent from 'useragent';

@Injectable()
export class SecurityService {
	generatePassword(length = 8)
	{
		const charset = "0123456789";
		let retVal = "";
		let char = "";
		for (let i = 0, n = charset.length; i < length; ++i) {
			char = charset.charAt(Math.floor(Math.random() * n));
			if (Math.random() >= 0.5)
				char = char.toUpperCase();
			retVal += char;
		}
		return retVal;
	}

	async hashArgon2(value: string)
	{
		return await argon2.hash(value);
	}

	async verifyArgon2(hash: string, value: string)
	{
		return await argon2.verify(hash, value);
	}

	generateCryptoKey(length = 32)
	{
		let value = '';
		for (let index = 0; index < length; index++) {
			value += String.fromCharCode(Math.random() * 10000);
		}
		return value;
	}

	generateSigningKey(length = 32)
	{
		return this.generateCryptoKey(length);
	}

	generateEncryptionKey(length = 32)
	{
		return this.generateCryptoKey(length);
	}

	getIp(request: Request)
	{
		return requestIp.getClientIp(request);
	}

	getNavigator(request: Request)
	{
		const agent = useragent.parse(request.headers['user-agent']);
		return agent.toAgent();
	}

	getOs(request: Request)
	{
		const agent = useragent.parse(request.headers['user-agent']);
		return agent.os.toString();
	}
}
