export interface IAppointment {
    id: string,
    title: string,
    date: Date,
    time: string,
    description?: string,
}

export interface IAppointmentResponse {
    appointments: IAppointment[]
}

export interface IAppointmentResponseById {
    appointment: IAppointment
}

export interface IModalAppointment {
    currentAppointment: IAppointment
}