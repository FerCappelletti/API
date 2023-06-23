export default interface IUser extends Document {
    email: string;
    password: string,
    isValidPassword: (pw: string) => Promise<boolean>
}