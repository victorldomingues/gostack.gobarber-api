import "reflect-metadata"
import CreateAppointmentService from "./create-appointment.service";
import FakeAppointmentsRepository from "../repositories/fakes/fake-appointments.repository";
import AppError from "@shared/errors/AppError";

describe('CreateAppointment', () => {

    let repository: FakeAppointmentsRepository;
    let service: CreateAppointmentService;

    beforeEach(() => {
        repository = new FakeAppointmentsRepository();
        service = new CreateAppointmentService(repository);
    });

    it('should be able to create a new appointment', async () => {
        const date = new Date();
        const appointment = await service.execute({
            date,
            providerId: '123'
        });
        expect(appointment).toHaveProperty('id');
        expect(appointment.providerId).toBe('123');
        expect(appointment.date).toBe(date);
    });
    it('should not be able to create two appointments on the same time', async () => {
        const date = new Date(2020, 4, 10, 11);
        const appointment = await service.execute({
            date,
            providerId: '123'
        });

        // esperar que a operação seja rejeitada, lance uma exceção do tipo AppError
        await expect(service.execute({
            date,
            providerId: '123'
        })).rejects.toBeInstanceOf(AppError);
    });
});