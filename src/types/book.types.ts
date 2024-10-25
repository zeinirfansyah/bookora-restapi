export default interface IBookType {
    book_code: string,
    book_name: string,
    book_cover?: string | null,
    book_category_id?: string | null,
    book_author_id?: string | null,
    book_publisher_id?: string | null,
    created_at: Date,
    updated_at: Date
}