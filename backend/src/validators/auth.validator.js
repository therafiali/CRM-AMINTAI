export function validateSignupInput({ name, email, password, roleId }) {
    if (!name || !email || !password || !roleId) {
        throw { status: 400, message: 'name, email, password, and roleId are required' };
    }

    // Optional: check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw { status: 400, message: 'Invalid email format' };
    }

    // Optional: enforce password length
    if (password.length < 6) {
        throw { status: 400, message: 'Password must be at least 6 characters long' };
    }
}


export function validateLoginInput({ email, password }) {
    if (!email || !password) {
        throw { status: 400, message: 'Email and password are required' };
    }
}