import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { provider_id, date } = request.body;

		const dateParsed = parseISO(date);

		const createAppointmentService = container.resolve(
			CreateAppointmentService,
		);
		const appointment = await createAppointmentService.execute({
			provider_id,
			date: dateParsed,
		});

		return response.status(200).json(appointment);
	}
}
