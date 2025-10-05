import { createRoot } from "solid-js";
import { createStore, produce } from "solid-js/store";
import * as jose from 'jose';
import type { IBearer, IClaims, IRealmAccess } from "./ISecurity";

function createSharedClaims() {
    let [claims, setClaims] = createStore<IClaims>({
        preferred_username: '',
        booking: false,
    });
    let [bearer, setBearer] = createStore<IBearer>({token: ''});

    const fillClaims = (token: string) =>
    {
        setBearer("token", token);
        const jwt = jose.decodeJwt(bearer.token);
        let realm_access: IRealmAccess | unknown = jwt["urn:zitadel:iam:org:project:roles"];
        
        if(realm_access == undefined)
        {
            setClaims(produce((c) => {
                c.preferred_username = jwt.preferred_username;
                c.sub = Number(jwt.sub);
            }));
        }
        else
        {       
            setClaims(produce((c) => {
                c.preferred_username = jwt.preferred_username;
                c.sub = Number(jwt.sub);
                c.booking = realm_access['booking'] != undefined;
            }));
        }
    }

    const emptyClaims = () =>
    {
        setBearer("token", '');

        setClaims(produce((c) => {
            c.preferred_username = '';
            c.booking = false;
        }));
    }

    return { claims, bearer, fillClaims, emptyClaims };
}

export default createRoot(createSharedClaims);