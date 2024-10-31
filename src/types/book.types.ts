export default interface IBookType {
    book_code: string,
    book_name: string,
    book_cover?: string | null,
    created_at: Date,
    updated_at: Date,

    book_category_id?: string | null,
    category_code?: string,
    category_name?: string,
    book_author_id?: string | null,
    author_code?: string,
    author_name?: string,
    book_publisher_id?: string | null,
    publisher_code?: string,
    publisher_name?: string,
}