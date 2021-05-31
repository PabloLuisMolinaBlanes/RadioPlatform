export class RadioSet {
    id?: string;
    brand: string;
    name: string;
    type: string;
    amplitude: string;
    price?: number;
    multiplier?: number;
    isfavourite?: boolean = false;
    constructor(brand: string, name: string, type: string, amplitude: string, id?: string, price?: number) {
        this.id = id;
        this.brand = brand;
        this.name = name;
        this.type = type;
        this.amplitude = amplitude;
        this.price = price;
    }
}
