
export interface ProfileUser {
    uid?:string;
    firstname?:string;
    middlename?: string;
    lastname?:string;
    contact?:string;
    houseNo?: number;
    street?: string;
    brgy?: string;
    municipality?: string;
    prov?: string;
    email?:string;
    emailVerified?: boolean;
    imgUrl?: string;
}