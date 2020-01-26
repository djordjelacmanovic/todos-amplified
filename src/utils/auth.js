import Auth from "@aws-amplify/auth";
import awsConfig from "aws-exports";

Auth.configure(awsConfig);

class AuthService {
  async getCurrentUser() {
    return await Auth.currentAuthenticatedUser();
  }

  async getCurrentUsername() {
    const { username } = await this.getCurrentUser();
    return username;
  }
}

const AuthSvc = new AuthService();

export default AuthSvc;
