export default interface IUserType {
    user_code: string,
    fullname: string,
    username: string,
    email: string,
    phone?: string | null,
    password: string,
    confirm_password?: string | null,
    profile_image?: string | null,
    role: 'CUSTOMER' | 'ADMIN',
    created_at: Date,
    updated_at: Date
}