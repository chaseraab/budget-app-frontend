export class Income {
    id: number;
    name: string;
    amount: number;
    isRecurring: boolean;
    accountId: number;

    constructor(id: number, name: string, amount: number, is_recurring: boolean, account_id: number) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.isRecurring = is_recurring;
        this.accountId = account_id;
    }
}