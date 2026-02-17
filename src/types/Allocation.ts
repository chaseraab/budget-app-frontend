export class Allocation {
    id: number;
    name: string;
    type: string;
    amount: number;
    isExpected: boolean;
    isActive: boolean;
    
    constructor(id: number, name: string, type: string, amount: number, isExpected: boolean, isActive: boolean) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.amount = amount;
        this.isExpected = isExpected;
        this.isActive = isActive;
    }
}