import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('redis')
@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('redis-test')
  @ApiOperation({
    summary: 'Test Redis',
  })
  @HttpCode(HttpStatus.OK)
  async testRedis() {
    const result = await this.redisService.set('name', 'saurav');
    console.log('result', result);
    const value = await this.redisService.get('name');
    console.log('value', value);
    return {
      message: 'Redis working',
      data: value,
    };
  }

  @Get('redis-mset')
  @ApiOperation({
    summary: 'Test Redis Mset',
  })
  @HttpCode(HttpStatus.OK)
  async testRedisMset() {
    const result = await this.redisService.mset();
    console.log('result', result);
    const value = await this.redisService.mget();
    console.log('value', value);
    const keys = await this.redisService.keys();

    const setnex = await this.redisService.setnex('key3', 'value3');
    console.log('setnex', setnex);
    const getsetnex = await this.redisService.get('key3');
    console.log('getsetnex', getsetnex);

    const del = await this.redisService.del('name');
    console.log('del', del);
    const getdel = await this.redisService.get('key3');
    console.log('getdel', getdel);

    const setRange = await this.redisService.setRange('name', 'sarkar', 0);
    console.log('setRange', setRange);
    const getRange = await this.redisService.getRange('name', 0, 2);
    console.log('getRange', getRange);
    const append = await this.redisService.append('name', 'sarkar');
    console.log('append', append);

    const type = await this.redisService.type('name');
    console.log('type', type);
    const exists = await this.redisService.exists('name');
    console.log('exists', exists);

    const expire = await this.redisService.expire('name', 10);
    console.log('expire', expire);

    const setex = await this.redisService.setex('name', 10, 'sarkar');
    console.log('setex', setex);
    const getsetex = await this.redisService.get('name');
    console.log('getsetex', getsetex);

    const ttl = await this.redisService.ttl('name');
    console.log('ttl', ttl);

    return {
      message: 'Redis working',
      data: {
        value,
        keys,
        setnex,
        getsetnex,
        del,
        getdel,
        setRange,
        getRange,
        append,
        type,
        exists,
        expire,
        setex,
        getsetex,
        ttl,
      },
    };
  }

  @Get('redis-list')
  @ApiOperation({
    summary: 'Test Redis List',
  })
  @HttpCode(HttpStatus.OK)
  async testRedisList() {
    const lPush = await this.redisService.lpush(
      'name',
      'saurav',
      'hello',
      'himani',
    );
    console.log('result', lPush);
    const rPush = await this.redisService.rpush(
      'name',
      'sarkar',
      'himani',
      'kalyani',
    );
    console.log('result', rPush);
    const value = await this.redisService.lpop('name');
    console.log('value', value);
    const rvalue = await this.redisService.rpop('name');
    console.log('rvalue', rvalue);
    const keys = await this.redisService.keys();

    const len = await this.redisService.lenList('name');
    console.log('len', len);
    return {
      message: 'Redis working',
      data: {
        lPush,
        rPush,
        value,
        rvalue,
        keys,
        len,
      },
    };
  }

  @Get('redis-list-range')
  @ApiOperation({
    summary: 'Test Redis List Range',
  })
  @HttpCode(HttpStatus.OK)
  async testRedisListRange() {
    const lRange = await this.redisService.lRange('name', 1, -1);
    console.log('lRange', lRange);
    return {
      message: 'Redis working',
      data: {
        lRange,
      },
    };
  }
}
