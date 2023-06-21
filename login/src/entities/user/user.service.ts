import User from '../user/user.model';
import token from '../../utils/token';
import UserDocument from '../user/user.interface'

class UserService {
    private user = User;

    /**
     * Register a new user
     */
    public async register(
        email: string,
        password: string
    ): Promise<UserDocument> {
        try {
            const user = await this.user.create({
                email,
                password
            });

            //const accessToken = token.createToken(user);
            return user ;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to login a user
     */
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });

            if (!user) {
                throw new Error('Unable to find user with that email address');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }
}

export default UserService;