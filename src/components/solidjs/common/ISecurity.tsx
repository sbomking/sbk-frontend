export interface IClaims {
    preferred_username: string,
    sub: number,
    booking: boolean
}

export interface IRealmAccess {
    roles: string[],
}

export interface IBearer {
    token: string,
}