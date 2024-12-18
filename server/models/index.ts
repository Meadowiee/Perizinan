import type { Sequelize } from "sequelize";
import { genSaltSync, hashSync } from "bcrypt";
import { User } from "./User";

export { User };

export const hashPassword = (password: string) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
};

export function initModels(sequelize: Sequelize) {
    User.initModel(sequelize);

    return {
        User,
    };
}