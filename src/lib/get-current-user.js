import { Auth } from 'aws-amplify';

const getCurrentUser = async () => {
  return await Auth.currentAuthenticatedUser();
};

const getCurrentUsername = async () => {
  const { username } = await getCurrentUser();
  return username;
}

export {
  getCurrentUser,
  getCurrentUsername
}