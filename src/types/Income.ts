export class Income {
    id: number;
    name: string;
    amount: number;
    isActive: boolean;
    accountId: number;

    constructor(id: number, name: string, amount: number, is_active: boolean, account_id: number) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.isActive = is_active;
        this.accountId = account_id;
    }
}