export interface DecodedJwt {
    exp?: number; // seconds since epoch
    iat?: number;
    sub?: string | number;
    [key: string]: unknown;
}

export function decodeJwt(token: string): DecodedJwt | null {
    try {
        const [, payload] = token.split(".");
        if (!payload) return null;
        const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(json) as DecodedJwt;
    } catch {
        return null;
    }
}

export function isJwtExpired(token: string, skewSeconds = 0): boolean {
    const decoded = decodeJwt(token);
    if (!decoded?.exp) return false;
    const nowSeconds = Math.floor(Date.now() / 1000) + skewSeconds;
    return decoded.exp <= nowSeconds;
}


