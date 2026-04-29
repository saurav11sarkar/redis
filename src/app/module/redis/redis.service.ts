import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: RedisClientType;

  async onModuleInit() {
    // this.client = createClient({
    //   username: 'default',
    //   password: 'h4KkImKend5tb6SRCReBsqp66DqTl1yx',
    //   socket: {
    //     host: 'redis-14223.crce300.ap-south-1-2.ec2.cloud.redislabs.com',
    //     port: 14223,
    //   },
    // });

    this.client = createClient({
      url: 'redis://localhost:6379',
    });

    this.client.on('error', (err) => console.log('Redis Client Error', err));

    await this.client.connect();

    console.log('✅ Redis Connected');
  }

  async set(key: string, value: string) {
    const result = await this.client.set(key, value);
    return result;
  }

  async get(key: string) {
    const value = await this.client.get(key);
    return value;
  }

  async mset() {
    const value = await this.client.mSet({
      key1: 'value1',
      key2: 'value2',
    });

    console.log('value', value);

    return value;
  }

  async mget() {
    const value = await this.client.mGet(['key1', 'key2']);
    console.log('value', value);
    return value;
  }

  async keys() {
    const keys = await this.client.keys('*');
    console.log('keys', keys);
    return keys;
  }

  async setnex(key: string, value: string) {
    const result = await this.client.setNX(key, value);
    return result;
  }

  async del(key: string) {
    const result = await this.client.del(key);
    return result;
  }

  async getRange(key: string, start: number, end: number) {
    const value = await this.client.getRange(key, start, end);
    console.log('value', value);
    return value;
  }

  async setRange(key: string, value: string, offset: number) {
    const result = await this.client.setRange(key, offset, value);
    console.log('result', result);
    return result;
  }

  async append(key: string, value: string) {
    const result = await this.client.append(key, value);
    console.log('result', result);
    return result;
  }

  async exists(key: string) {
    const result = await this.client.exists(key);
    console.log('result', result);
    return result;
  }

  async type(key: string) {
    const result = await this.client.type(key);
    console.log('result', result);
    return result;
  }

  async incr(key: string) {
    const result = await this.client.incr(key);
    console.log('result', result);
    return result;
  }

  async expire(key: string, ttl: number) {
    const result = await this.client.expire(key, ttl);
    console.log('result', result);
    return result;
  }

  async setex(key: string, ttl: number, value: string) {
    const result = await this.client.setEx(key, ttl, value);
    console.log('result', result);
    return result;
  }

  async ttl(key: string) {
    const result = await this.client.ttl(key);
    console.log('result', result);
    return result;
  }

  async lpush(key: string, ...values: string[]) {
    const result = await this.client.lPush(key, values);
    console.log('result', result);
    return result;
  }

  async rpush(key: string, ...values: string[]) {
    const result = await this.client.rPush(key, values);
    console.log('result', result);
    return result;
  }

  async lpop(key: string) {
    const result = await this.client.lPop(key);
    console.log('result', result);
    return result;
  }

  async rpop(key: string) {
    const result = await this.client.rPop(key);
    console.log('result', result);
    return result;
  }

  async lenList(key: string) {
    const result = await this.client.lLen(key);
    console.log('result', result);
    return result;
  }

  async lRange(key: string, start: number, end: number) {
    const result = await this.client.lRange(key, start, end);
    console.log('result', result);
    return result;
  }

  async blpop(key: string, timeout: number) {
    const result = await this.client.blPop(key, timeout);
    console.log('result', result);
    return result;
  }

  async brpop(key: string, timeout: number) {
    const result = await this.client.brPop(key, timeout);
    console.log('result', result);
    return result;
  }

  async brpoplpush(source: string, destination: string, timeout: number) {
    const result = await this.client.brPopLPush(source, destination, timeout);
    console.log('result', result);
    return result;
  }

  async lindex(key: string, index: number) {
    const result = await this.client.lIndex(key, index);
    console.log('result', result);
    return result;
  }

  async lset(key: string, index: number, value: string) {
    const result = await this.client.lSet(key, index, value);
    console.log('result', result);
    return result;
  }

  async lrem(key: string, count: number, value: string) {
    const result = await this.client.lRem(key, count, value);
    console.log('result', result);
    return result;
  }

  async ltrim(key: string, start: number, end: number) {
    const result = await this.client.lTrim(key, start, end);
    console.log('result', result);
    return result;
  }

  async sadd(key: string, ...values: string[]) {
    const result = await this.client.sAdd(key, values);
    console.log('result', result);
    return result;
  }

  async sMeb(key: string) {
    const result = await this.client.sMembers(key);
    console.log('result', result);
    return result;
  }

  async srem(key: string, value: string) {
    const result = await this.client.sRem(key, value);
    console.log('result', result);
    return result;
  }

  async sismember(key: string, value: string) {
    const result = await this.client.sIsMember(key, value);
    console.log('result', result);
    return result;
  }

  async sinter(...key: string[]) {
    const result = await this.client.sInter(key);
    console.log('result', result);
    return result;
  }
}
