export interface IAppointment {
    _id: string,
    title: string,
    description: string,
    date: Date
}

export interface IAppointmentResponse {
    appointments: IAppointment[]
}

export interface IAppointmentResponseById {
    appointment: IAppointment
}