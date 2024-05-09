import { request } from "./api";
import { NewMessageProps } from "./_model";

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



class UserService {
    async getOverview() {
        try {
            const response = await request(
                '/overview' , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getMessages() {
        try {
            const response = await request(
                'notifications' , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    } 
     

    async newMessage(payload: NewMessageProps) {
        try {
            const response = await request(
                'notification' , 
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    } 
    
    async getMessageDetails(id: string) {
        try {
            const response = await request(
                `notification/${id}` , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    } 

    async getUser(id: string) {
        try {
            const response = await request(
                `user/${id}` , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    } 


    async getProfile() {
        try {
            const response = await request(
                `profile` , 
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    } 
 

}


export default UserService;