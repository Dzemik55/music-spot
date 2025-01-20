export type LoginRequest = {
    usernameOrEmail: string,
    password: string
}

export type SignUpRequest = {
    email: string,
    username: string,
    name: string,
    password: string
}

export type AuthResponse = {
    id: number,
    username: string,
    email: string,
    name: string
}