export function isPasswordValid(password: any) {
  if (!password || password.includes(" ")) {
    return false;
  }

  return password.length >= 5 && password.length <= 20;
}
