export type Transaction = {
    id: number;
    date: string;        // "YYYY-MM-DD"
    accountId: number;
    allocationId: number;
    item: string;
    company: string;
    amount: number;
};
