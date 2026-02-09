export class Account {
    id: number;
    name: string;
    type: string;
    is_active: boolean;

    constructor(id: number, name: string, type: string, is_active: boolean) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.is_active = is_active;
    }
}
