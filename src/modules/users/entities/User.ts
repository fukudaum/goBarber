interface User {
    id?: string
    name: string
    password: string
    email: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    avatar?: string | null
}

export default User;
