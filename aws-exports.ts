import { Amplify } from 'aws-amplify';

const awsConfig: Record<string, unknown> = {
  Auth: {
    Cognito: {
      userPoolClientId: '7um0ud598536e6faa0o2s544hs',
      userPoolId: 'us-east-2_LVgZylH36',
      loginWith: { 
        oauth: {
          domain: 'testamentospp.auth.us-east-2.amazoncognito.com',
          scopes: ['openid', 'email', 'phone', 'profile', 'aws.cognito.signin.user.admin'],
          redirectSignIn: ['http://localhost:3000/'],
          redirectSignOut: ['http://localhost:3000/'],
          responseType: 'code',
        },
        username: true, // Optional
        email: false, // Optional
        phone: false // Optional
      }
    }
  }
};

// Configure Amplify with the settings
Amplify.configure(awsConfig);

export default awsConfig;
