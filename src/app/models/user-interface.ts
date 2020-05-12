export class User {
    email: string;
    password: string;
    displayName: string;
    phoneNumber: string;
}

export interface Roles {
    editor?: boolean;
    admin?: boolean;
}

export interface UserInterface {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    photoUrl?: string;
    roles: Roles;
}