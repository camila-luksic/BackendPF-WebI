import z from 'zod';

const userSquema = z.object({
    name: z.string().min(2).max(30),
    apellido:z.string().min(2).max(30),
    email: z.string().email(),
    password: z.string().min(6),
    rol:z.string().min(6)
});

export function validateUser(user) {
    return userSquema.safeParse(user);
}

export function validatePartialUser(user) {
    return userSquema.partial().safeParse(user);
}
