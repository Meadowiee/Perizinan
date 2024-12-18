import { User } from "~/server/models";

export default defineMyEventHandler(async () => {
    const users = await User.findAll();
    return users;
})