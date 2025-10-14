import { generateToken } from '../utils/generateToken.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { validateLoginInput, validateSignupInput } from '../validators/auth.validator.js';
import { findUserByEmail, createUser } from '../repositories/user.repository.js';

export async function registerUser({ name, email, password, roleId, departmentId }) {
    // ✅ 1. Validate input
    validateSignupInput({ name, email, password, roleId });

    // ✅ 2. Check for existing user
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw { status: 409, message: 'Email already registered' };
    }

    // ✅ 3. Hash password
    const hashedPassword = await hashPassword(password);

    // ✅ 4. Create user
    const user = await createUser({
        name,
        email,
        password: hashedPassword,
        roleId,
        departmentId: departmentId ?? null,
    });

    // ✅ 5. Generate JWT token
    const token = generateToken({
        userId: user.id,
        roleId: user.roleId,
        departmentId: user.departmentId ?? null,
    });

    // ✅ 6. Return sanitized result
    const { password: _p, ...userSafe } = user;
    return { user: userSafe, token };
}


export async function loginUser({ email, password }) {
    // ✅ 1. Validate input
    validateLoginInput({ email, password });

    // ✅ 2. Find user
    const user = await findUserByEmail(email);
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }

    // ✅ 3. Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
        throw { status: 401, message: 'Invalid credentials' };
    }

    // ✅ 4. Generate token
    const token = generateToken({
        userId: user.id,
        email: user.email,
        roleId: user.roleId,
        departmentId: user.departmentId ?? null,
        roleName: user.role?.name ?? null, // safe optional chaining
    });

    // ✅ 5. Return sanitized user
    const { password: _p, ...userSafe } = user;
    return { user: userSafe, token };
}