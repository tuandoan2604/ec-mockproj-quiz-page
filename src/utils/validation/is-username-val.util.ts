export function isUsernameValid(username: any) {
    if (!username) {
      return false;
    }
  
    const reg = new RegExp("^[a-z0-9_-]{4,15}$");
  
    return reg.test(username);
  }
  