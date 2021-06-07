import { SafeResourceUrl } from "@angular/platform-browser";

export class User {
    id?: string;
    country: string;
    preferredFrequency: string;
    username: string;
    profilepicture?: any;
    callsign?: string;
    status?: string;
    transmitting?: boolean;
    favouriteAntenna?: string;
    favouriteRadioSet?: string;
    image?: SafeResourceUrl;
    transmittingFrequency?: string;
    constructor(country: string,preferredFrequency: string,username: string,status?:string,transmitting?: boolean,id?:string, password?: string,profilepicture?: File,callsign?: string, transmittingFrequency?: string) {
        this.id = id;
        this.country = country;
        this.preferredFrequency = preferredFrequency;
        this.username = username;
        this.status = status;
        this.transmitting = transmitting;
        this.profilepicture = profilepicture;
        this.callsign = callsign;
        this.transmittingFrequency = transmittingFrequency;
    }
}
