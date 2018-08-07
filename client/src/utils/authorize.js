/**
 * Save JWT token in local storage.
 */
export function setToken(token){
    localStorage.setItem('access_token', token);
}