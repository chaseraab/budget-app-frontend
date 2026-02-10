export class Account {
    id: number;
    name: string;
    type: string;
    isActive: boolean;

    constructor(id: number, name: string, type: string, isActive: boolean) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.isActive = isActive;
    }
}
