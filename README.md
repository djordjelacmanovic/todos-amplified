## Todo Amplified

Todo app done with React and AWS Amplify w/ owner-based authorization. [DEMO](https://master.d163zvopcuzdia.amplifyapp.com)

### Stack

- React for front-end
- AWS Cognito for Auth
- AWS AppSync (GraphQL) for API
- DynamoDB for persistence and real-time updates
- AWS S3 for hosting
- AWS Amplify Console for CI/CD

### Features

#### Private Todos

- Naturally only you see your own.
- Real-time updates if you create or update from another window - try a different tab/browser


#### Shared Todos

- all users can see the shared todos
- only owners can delete the todos they created
- same real-time updates as with private Todos
