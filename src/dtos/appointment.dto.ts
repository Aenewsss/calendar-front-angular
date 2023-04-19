export interface AppointmentDto {
    id?: string | number,
    title: string,
    date: Date,
    time: string,
    description?: string,
}