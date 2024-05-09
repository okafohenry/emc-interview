import { request } from "./api";
import { AuthProps } from "./_model";

/**
 *
 * @param {string} url
 * @param {string, [GET, POST, PATCH, PUT...]} method
 * @param {payload} payload
 * @param {boolean} token
 * @param {boolean} text
 * @param {boolean} form
 * @param {string | null} xHash
 * @returns Response Data;
 */



class AuthService {
    async signIn(payload: AuthProps) {

        try {
            const response = await request(
                'authentication/login' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async signUp(payload: AuthProps) {
        try {
            const response = await request(
                'authentication/register' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    } 
    
    async logout() {
        try {
            const response = await request(
                '' , 
                'POST',
                {},
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    } 
 

}


export default AuthService;