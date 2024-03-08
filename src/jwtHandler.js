import jwt_decode from 'jsonwebtoken';

// Function to retrieve and decode JWT from storage (e.g., cookie or local storage)
function getJwtToken() {
  // Replace 'your-token-key' with the key you used to store the JWT
  return localStorage.getItem('token');
}

// Function to get the decoded user data from the JWT
function getDecodedUser() {
  const token = getJwtToken();
  if (token) {
    return jwt_decode(token);
  }
  return null;
}

export { getJwtToken, getDecodedUser };
