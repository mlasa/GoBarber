import { Response, Request } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;
		const authenticateUser = container.resolve(AuthenticateUserService);

		const { authenticationToken, user } = await authenticateUser.execute({
			email,
			password,
		});

		return response.status(200).json({ authenticationToken, user });
	}
}
