const config = require("../config");
const user = require("../controllers/users");

const loadUser = async (req, res, next) => {
  // If no Authorization header with a token, unable to load a user
  try {
    console.log("top of try in loadUser", req.headers.authorization);
    // if (!req.headers.authorization) next();
    // Parse the token out of the authorization header
    const token = parseToken(req);
    // console.log(token)
    // Fetch user's info from auth0 by making a GET
    // request to auth0 with the access token in
    // the authorization header
    const authZeroUser = await fetchAuthZeroUser(token);
    // const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);
    // Lookup the user in _our_ database based on the
    // user info we got back from Auth0.
    
    // If no User exists in our database yet, create
    // one and return it!
    const user = await findOrCreateUser(authZeroUser);

    // Now we have a user. Set it on the request so we
    // can access it in controllers \o/
    req.user = user;
    console.log("is working?", authZeroUser);
    next();
  } catch (_error) {
    console.log(_error);
    next();
  }
};

const findOrCreateUser = async (authZeroUserJson) => {
  if (!authZeroUserJson) return;

  const existingUser = await user.findOne({ identifier: authZeroUserJson.sub });

  if (existingUser) return existingUser;

  // No user exists in _our_ DB yet, Let's create one with the info
  // we got from Auth0!
  const newUser = await user.create({
    identifier: authZeroUserJson.sub,
    email: authZeroUserJson.email,
    given_name: authZeroUserJson.given_name,
    family_name: authZeroUserJson.family_name,
    locale: authZeroUserJson.locale,
    picture: authZeroUserJson.picture,
    nickname: authZeroUserJson.nickname,
  });

  return newUser;
};

const fetchAuthZeroUser = async (token) => {
  // Get the user from Auth0, which is where we've stored user profiles
  const response = await fetch(`${config.auth0_baseURL}/userinfo`, {
    // headers: { Authorization: `Bearer ${token}` },
    headers: { Authorization: token}
  });
  console.log(response.json());
  return response.json();
};

const parseToken = (req) => {
  // Parse out the token. The token is in the Authorization header like this:
  // Authorization: Bearer <token>
  try {
    console.log(typeof req.headers.authorization);
    if (!undefined) {
      return req.headers.authorization.split(" ")[1];
    } else {
      console.log(res.headers.authorization);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = loadUser;
