import { User } from "~/server/models";

export default defineMyEventHandler(async (event) => {
    const id = event.context.params?.id ?? 1;
    const users = await User.destroy({
        where: { id: id },
    });
    return users;
});