export default interface IBookAuthorType {
    id?: string,
    author_code: string
    author_name: string
    author_photo?: string | null
    created_at: Date
    updated_at: Date
}