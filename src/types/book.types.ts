export default interface IBookType {
    id: string,
    book_code: string,
    book_name: string,
    book_category_id: string,
    book_author_id?: string,
    book_publisher_id?: string,
    created_at: Date,
    updated_at: Date
}