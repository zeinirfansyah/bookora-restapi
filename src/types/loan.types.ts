export default interface ILoanType {
    id: string,
    loan_code: string,
    user_id: string,
    book_id: string,
    loan_date: Date,
    loan_duration: number,
    status: 'ISSUED' | 'RETURNED',
    created_at: Date,
    updated_at: Date
}