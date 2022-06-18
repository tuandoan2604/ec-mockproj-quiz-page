export default (): Record<string, string> => ({
  jwtAccessTokenSecretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
  jwtAccessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  jwtRefreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  jwtRefreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
});
