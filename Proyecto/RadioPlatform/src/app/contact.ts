export class Contact {
    frequency: string;
    recording?: File;
    callsign?: string;
    country?: string;
    constructor(frequency: string, recording?: File, country?: string,callsign?:string) {
        this.frequency = frequency;
        this.recording = recording
        this.callsign = callsign;
        this.country = country;
    }
}
