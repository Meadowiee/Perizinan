import { z } from "zod";
import { User } from "~/server/models";

const registerSchema = z.object({
    username: z.string(),
    password: z.string().min(5),
});

export default defineEventHandler(async (event) => {
    const data = await useValidatedBody(event, registerSchema);
    const user = await User.findOne({ where: { username: data.username } });
    const confirmPassword = comparePassword(data.password, user!.password!);

    if (!confirmPassword) {
        throw createError({
            statusCode: 422,
            message: "Username atau password salah",
        });
    }

    const accessToken = encodeAccessToken({ username: user!.username!, id: user!.id });
    const refreshToken = encodeRefreshToken(user!.id);

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };

});