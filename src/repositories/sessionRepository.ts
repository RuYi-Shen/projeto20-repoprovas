import client from "../database.js";

export async function create(userId: number, token: string) {
  return await client.session.create({
    data: {
      userId,
      token,
    },
  });
}

export async function deleteByUserId(userId: number) {
  return await client.session.deleteMany({
    where: {
      userId,
    },
  });
}
