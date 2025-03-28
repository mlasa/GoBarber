import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const foundUser = await this.ormRepository.findOne({
			where: { email },
		});
		return foundUser;
	}

	public async findById(id: string): Promise<User | undefined> {
		const foundUser = await this.ormRepository.findOne({
			where: { id },
		});

		return foundUser;
	}

	public async create(data: ICreateUserDTO): Promise<User> {
		const user = this.ormRepository.create(data);
		await this.ormRepository.save(user);

		return user;
	}

	public async save(user: User): Promise<User> {
		return this.ormRepository.save(user);
	}
}

export default UsersRepository;
