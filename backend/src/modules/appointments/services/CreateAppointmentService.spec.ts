import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		createAppointmentService = new CreateAppointmentService(
			fakeAppointmentsRepository,
		);
	});

	it('should be able to create a new appointment', async () => {
		const appointment = await createAppointmentService.execute({
			date: new Date(),
			provider_id: '123456',
		});

		expect(appointment.provider_id).toBe('123456');
	});

	it('should not be able to create two appointments on the same time', async () => {
		const appointmentDate = new Date(2021, 4, 10, 11);
		await createAppointmentService.execute({
			date: appointmentDate,
			provider_id: '123456',
		});

		await expect(
			createAppointmentService.execute({
				date: appointmentDate,
				provider_id: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
