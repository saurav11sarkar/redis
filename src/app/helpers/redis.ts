import { createClient } from 'redis';

export type RedisClient = ReturnType<typeof createClient>;

// export async function createRedisClient(): Promise<RedisClient> {
//   const client = createClient({
//     username: 'default',
//     password: 'h4KkImKend5tb6SRCReBsqp66DqTl1yx',
//     socket: {
//       host: 'redis-14223.crce300.ap-south-1-2.ec2.cloud.redislabs.com',
//       port: 14223,
//     },
//   });

//   client.on('error', (err: Error) => console.log('Redis Client Error', err));

//   await client.connect();

//   await client.set('foo', 'bar');
//   const result = await client.get('foo');
//   console.log(result);

//   return client;
// }

export async function createRedisClient(): Promise<RedisClient> {
  const client = createClient({
    url: 'redis://localhost:6379',
  });

  client.on('error', (err: Error) => console.log('Redis Client Error', err));
  await client.connect();

  return client;
}
