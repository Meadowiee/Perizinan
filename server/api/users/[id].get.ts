import { User } from "~/server/models";

export default defineMyEventHandler(async (event) => {
    const id = event.context.params?.id ?? 1;
    const users = await User.findOne({
        where: { id: id },
    });
    return users;
});