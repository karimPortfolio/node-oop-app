

class AuthCookie {
    static getCookieValue(cookieString, key) {
        const match = cookieString.match(new RegExp('(^| )' + key + '=([^;]+)'));
        if (match) {
            return match[2];
        }
        return null;
    }
    
}

export { AuthCookie };