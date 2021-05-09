export class Antenna {
    id?: string;
    type: string;
    brand?: string;
    height: number;
    name: string;
    range: number;
    price?: number;
    multiplier?: number;
    constructor(type: string, name: string, range: number,height: number,brand?: string,id?:string, price?: number) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.range = range;
        this.height = height;
        this.brand = brand;
        this.price = price;
    }
}
