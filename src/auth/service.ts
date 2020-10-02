import passport from 'passport';
import OAuth2Strategy from 'passport-oauth';

passport.use('provider', new OAuth2Strategy({
    authorizationURL: 'https://www.provider.com/oauth2/authorize',
    tokenURL: 'https://www.provider.com/oauth2/token',
    clientID: '123-456-789',
    clientSecret: 'shhh-its-a-secret',
    callbackURL: 'https://www.example.com/auth/provider/callback'
  },
  // function(accessToken, refreshToken, profile, done) {
  //   User.findOrCreate(..., function(err, user) {
  //     done(err, user);
  //   });
  // }
));

export class AuthService {

}