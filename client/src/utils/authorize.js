class Auth {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
        localStorage.removeItem('token');
    }

    /**
     * Get a token value.
     *
     * @returns {string}
     */
    static getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Parse JWT token
     */
    static parseToken(){
        let token = localStorage.getItem('token');

        if(token !== null){
            let base64URL = token.split('.')[1];
            var base64 = base64URL.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        }
    }
}

export default Auth;