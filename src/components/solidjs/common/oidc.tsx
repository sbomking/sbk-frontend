import { WebStorageStateStore, UserManager, type UserManagerSettings, Log, User } from "oidc-client-ts";
import createSharedClaims from '@solidjs/common/sharedClaims';

export async function oidcts(extra_path_redirect_uri: string) {
    const { claims, bearer, fillClaims, emptyClaims } = createSharedClaims;
    let mgr: UserManager;
    
    const AUTHORITY_URL = import.meta.env.PUBLIC_VITE_AUTHORITY_URL;
    const CLIENT_ID = import.meta.env.PUBLIC_VITE_CLIENT_ID;
    const ZITADEL_PROJECT_ID = import.meta.env.PUBLIC_VITE_PROJECT_ID;
    const REDIRECT_URI: string = import.meta.env.PUBLIC_VITE_REDIRECT_URI + extra_path_redirect_uri;

    const settings: UserManagerSettings = {
        automaticSilentRenew: true,
        //silentRequestTimeout: 100
        authority: AUTHORITY_URL,
        client_id: CLIENT_ID,

        redirect_uri: REDIRECT_URI,
        silent_redirect_uri: REDIRECT_URI,
        post_logout_redirect_uri: REDIRECT_URI,
        //post_logout_redirect_uri: `${window.location.origin}`,
        //response_mode: 'fragment',
        response_mode: 'query',
        //response_type code is 100% sure
        response_type: 'code',

        scope: 'openid profile email offline_access urn:zitadel:iam:org:project:id:' + ZITADEL_PROJECT_ID + ':aud urn:zitadel:iam:org:project:' + ZITADEL_PROJECT_ID + ':roles',
        // urn:iam:org:project:roles urn:zitadel:iam:org:project:id:226445695698076260:aud
        //roles offline_access urn:zitadel:iam:org:project:226445695698076260:roles urn:zitadel:iam:org:project:roles 
        //offline_access urn:zitadel:iam:org:project:id:226445695698076260:aud urn:zitadel:iam:org:project:226445695698076260:roles
        //userStore: new WebStorageStateStore({ store: window.sessionStorage }),
        userStore: new WebStorageStateStore({ store: window.localStorage }),
        stateStore: new WebStorageStateStore({ store: window.localStorage }),
        //stateStore: new WebStorageStateStore({ store: window.sessionStorage }),
        loadUserInfo: true,
        filterProtocolClaims: true,
        revokeTokensOnSignout: true,

        metadata: {
            authorization_endpoint: AUTHORITY_URL + "/oauth/v2/authorize",
            end_session_endpoint: AUTHORITY_URL + "/oidc/v1/end_session",
            introspection_endpoint: AUTHORITY_URL + "/oauth/v2/introspect",
            revocation_endpoint: AUTHORITY_URL + "/oauth/v2/revoke",
            token_endpoint: AUTHORITY_URL + "/oauth/v2/token",
            userinfo_endpoint: AUTHORITY_URL + "/oidc/v1/userinfo",
            registration_endpoint: ""
        },
    };
    Log.setLogger(console);

    mgr = new UserManager(settings);

    try {
        /*
        let usr = await signinRedirectCallback().then(function(user){
            var your_state = user.state;
        })
        .catch(function(err) {
            
        });
        */        
        //signinCallback is responsible for receiving the tokens and user data after authentication
        //TODO THIS HAS BEEN COMMENTED OUT IS IT NORMAL???
        //let usr = await mgr.signinCallback();
        await mgr.signinCallback();
        /*
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if(id == null)
        {
            window.location = window.location + user.state || "/";
            console.log("STATE:" + usr?.state);
        }
        */

        /*
        console.log(usr?.access_token);
        console.log(usr?.id_token);
        */
    } catch (error) {
        console.log(error)
    }

    let user = await mgr.getUser();
    if (!user) {
        console.log('no user');
        await mgr.signinRedirect(/*{state:8}*/).catch(err => {
            console.log(err);
        });

        console.log('after redirect');
    }
    else {
        console.log('USER LOGIN !!!!');
        //console.log(user?.access_token);
        //console.log(user?.id_token);
        //fillClaims(user?.id_token);
        if(user.id_token)
        {
            fillClaims(user.id_token);
        }
    }

    mgr.events.addAccessTokenExpiring(function () {
        console.log("token expiring");

        // maybe do this code manually if automaticSilentRenew doesn't work for you
        mgr.signinSilent().then(function (user) {
            console.log("silent renew success", user);
        }).catch(function (e) {
            console.log("silent renew error", e.message);
        });
    });

    mgr.events.addAccessTokenExpired(function () {
        try {
            mgr.signinRedirect();
        } catch (error) {
            console.log(error)
        }
    });

    mgr.events.addSilentRenewError(function (e) {
        console.log("silent renew error", e.message);
    });

    mgr.events.addUserLoaded(function (user: User) {
        console.log("user loaded", user);

        if(user.id_token != undefined)
        {
            fillClaims(user.id_token);
        }
        /* TODO IT HAS BEEN COMMENTED OUT WHY?
        mgr.getUser().then(function () {
            console.log("getUser loaded user after userLoaded event fired");
        });
        */
    });

    /*
    mgr.events.addUserUnloaded(function (e) {
        console.log("user unloaded");
    });
    mgr.events.addUserSignedIn(function (e) {
        console.log("user logged in to the token server");
    });
    mgr.events.addUserSignedOut(function (e) {
        console.log("user logged out of the token server");
    });
    */
   return mgr;
}
