export class User {
    country: string;
    preferredFrequency: string;
    username: string;
    password?: string;
    profilepicture?: File;
    callsign?: string;
    status: string;
    transmitting: boolean;
    constructor(country: string,preferredFrequency: string,username: string,status:string,transmitting: boolean,password?: string,profilepicture?: File,callsign?: string) {
        this.country = country;
        this.preferredFrequency = preferredFrequency;
        this.username = username;
        this.status = status;
        this.transmitting = transmitting;
        this.password = password;
        this.profilepicture = profilepicture;
        this.callsign = callsign;
    }
}
