import IUserType from "../user.types";

declare global {
    namespace Express {
        interface Request {
            user?: IUserType;
        }
    }
}
export { };