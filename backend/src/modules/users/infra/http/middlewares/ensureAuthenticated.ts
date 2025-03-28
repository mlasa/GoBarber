import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPaylod {
	iat: number;
	exp: number;
	sub: string;
}

export default function ensureAuthentication(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const authHeader = request.headers.authorization;

	if (!authHeader) throw new AppError('JWT token is missing', 401);

	const [, token] = authHeader.split(' ');

	try {
		const decoded = verify(token, authConfig.jwt.secret);
		const { sub } = decoded as ITokenPaylod;
		request.user = { id: sub };

		return next();
	} catch (err) {
		throw new AppError('JWT token is not valid', 401);
	}
}
