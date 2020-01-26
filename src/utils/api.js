import API, { graphqlOperation } from "@aws-amplify/api";
import PubSub from "@aws-amplify/pubsub";
import awsConfig from "aws-exports";

API.configure(awsConfig);
PubSub.configure(awsConfig);

class ApiService {
  async graphql(operation, params) {
    return await API.graphql(graphqlOperation(operation, params));
  }
}

const Api = new ApiService();

export default Api;
