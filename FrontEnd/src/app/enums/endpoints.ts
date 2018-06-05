import { environment } from "../../environments/environment";

class Endpoints {

    static baseUrl = environment.baseUrl;

    static forntend = {

    };

    static api = {
        user: {
            login: Endpoints.baseUrl + 'connect/token',
            logout: Endpoints.baseUrl + 'connect/revocation'
        },
        identity: {
            changePassword: Endpoints.baseUrl + 'api/Identity/password',
            antiforgery: Endpoints.baseUrl + 'api/Identity/antiforgery'
        }
    };

}

export  { Endpoints };
