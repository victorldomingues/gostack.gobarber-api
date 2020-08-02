import Appointment from "../infra/typeorm/entities/appointment";
import ICreateAppointmentDto from "../dtos/ICreateAppointmentDto";

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDto): Promise<Appointment>;
    save(data: Appointment): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
}