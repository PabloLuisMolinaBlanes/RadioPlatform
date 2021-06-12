export class Antenna {
    id?: string;
    type: string;
    brand?: string;
    height: string;
    name: string;
    range: string;
    price?: number;
    multiplier?: number;
    isfavourite?: boolean = false;
    constructor(type: string, name: string, range: string,height: string,brand?: string,id?:string, price?: number) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.range = range;
        this.height = height;
        this.brand = brand;
        this.price = price;
    }
}
