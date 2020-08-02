import { Request, Response } from "express";
import { container } from "tsyringe";
import { parseISO } from "date-fns";
import CreateAppointmentService from "@modules/appointments/services/create-appointment.service";

export default class AppointmentsController {
    async create(request: Request, response: Response): Promise<Response> {
        const { providerId, date } = request.body;
        const parsedDate = (parseISO(date));
        const service = container.resolve(CreateAppointmentService);
        const appointment = await service.execute({ providerId, date: parsedDate });
        return response.json(appointment);
    }
}