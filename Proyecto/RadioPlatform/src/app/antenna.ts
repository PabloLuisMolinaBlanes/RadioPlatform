export class Antenna {
    type: string;
    brand?: string;
    height: number;
    name: string;
    range: number;
    constructor(type: string, name: string, range: number,height: number,brand?: string) {
        this.type = type;
        this.name = name;
        this.range = range;
        this.height = height;
        this.brand = brand;
    }
}
