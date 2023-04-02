interface Appointment {
    id?: string
    date: Date | string
    provider_id: string
    user_id: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
}

export default Appointment;
