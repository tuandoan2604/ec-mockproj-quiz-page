import * as bcrypt from "bcrypt";

export async function transformPassword(password: string): Promise<any> {
  if (!password) {
    return;
  }

  const passwordHashed = await bcrypt.hash(password, 10);
  return passwordHashed;
}
