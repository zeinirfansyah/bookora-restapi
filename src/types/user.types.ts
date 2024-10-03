export default interface IUserType {
    user_code: string,
    fullname: string,
    username: string,
    email: string,
    phone?: string,
    password: string,
    profile_image?: string,
    role: 'CUSTOMER' | 'ADMIN',
    created_at: Date,
    updated_at: Date
}