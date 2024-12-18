import { z } from "zod";
import { User} from "~/server/models";

const registerSchema = z.object({
    username: z.string(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5)
})

.refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi Password tidak sama",
});

export default defineMyEventHandler(async (event) => {
    const data = await useValidatedBody(event, registerSchema);
    return await User.create(data);
});