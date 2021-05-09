import { SafeResourceUrl } from "@angular/platform-browser";

export class Contact {
    frequency: string;
    recording?: SafeResourceUrl;
    callsign?: string;
    location?: string;
    coordinates?: string;
    id?: string;
    number?: number;
    constructor(frequency: string, recording?: SafeResourceUrl, location?: string,callsign?:string, coordinates?: string, id?: string) {
        this.frequency = frequency;
        this.recording = recording
        this.callsign = callsign;
        this.location = location;
        this.coordinates = coordinates;
        this.id = id;
    }
}
