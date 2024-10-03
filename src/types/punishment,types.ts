export default interface IPunishmentType {
    id: string,
    user_id: string,
    punishment_code: string,
    penalty_fee: number,
    start_date: Date,
    end_date: Date,
    penalty_reason: string,
    penalty_status: 'INCOMPLETE' | 'COMPLETE'
    created_at: Date,
    updated_at: Date
}