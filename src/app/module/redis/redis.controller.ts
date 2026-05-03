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

  @Get('redis-list-blocked')
  @ApiOperation({
    summary: 'Test Redis List Blocked',
  })
  @HttpCode(HttpStatus.OK)
  async testRedisListBlocked() {
    const blpop = await this.redisService.blpop('name', 10);
    console.log('blpop', blpop);
    const brpop = await this.redisService.brpop('name', 10);
    console.log('brpop', brpop);
    const brpoplpush = await this.redisService.brpoplpush('name', 'name', 10);
    console.log('brpoplpush', brpoplpush);
    return {
      message: 'Redis working',
      data: {
        blpop,
        brpop,
        brpoplpush,
      },
    };
  }

  @Get('redis-lindex')
  @ApiOperation({
    summary: 'Test Redis Lindex',
  })
  @HttpCode(HttpStatus.OK)
  async testRedisLindex() {
    // const lpush = await this.redisService.lpush(
    //   'skill',
    //   'reactjs',
    //   'nodejs',
    //   'mongodb',
    //   'typescript',
    //   'nestjs',
    // );
    // console.log('lindex', lpush);

    const lindex = await this.redisService.lindex('skill', 2);
    console.log('lindex', lindex);
    return {
      message: 'Redis working',
      data: {
        // lpush,
        lindex,
      },
    };
  }

  @Get('redis-lset')
  @ApiOperation({
    summary: 'Test Redis Lset',
  })
  @HttpCode(HttpStatus.OK)
  async testRedisLset() {
    const lset = await this.redisService.lset('skill', 2, 'python');
    console.log('lset', lset);
    return {
      message: 'Redis working',
      data: {
        lset,
      },
    };
  }

  @Get('redis-ltrim')
  @ApiOperation({
    summary: 'Test Redis Ltrim',
  })
  @HttpCode(HttpStatus.OK)
  async testRedisLtrim() {
    const ltrim = await this.redisService.ltrim('number', 2, -1);
    console.log('ltrim', ltrim);
    return {
      message: 'Redis working',
      data: {
        ltrim,
      },
    };
  }

  @Get('redis-setadd')
  @ApiOperation({
    summary: 'Test Redis Setadd',
  })
  @HttpCode(HttpStatus.OK)
  async testRedisSetadd() {
    const sadd = await this.redisService.sadd(
      'person',
      'saurav',
      'himani',
      'kalyani',
      'manish',
      'himani',
    );
    console.log('sadd', sadd);

    const sMeb = await this.redisService.sMeb('person');
    console.log('sMeb', sMeb);

    const srem = await this.redisService.srem('person', 'saurav');
    console.log('srem', srem);
    await this.redisService.sadd('person', 'hello', 'hi');
    const sMeb2 = await this.redisService.sMeb('person');
    console.log('sMeb2', sMeb2);

    const sismember = await this.redisService.sismember('person', 'himani');
    console.log('sismember', sismember);

    const setadd1 = await this.redisService.sadd('setadd1', 'saurav', 'himani');
    const setadd2 = await this.redisService.sadd('setadd2', 'saurav', 'himani');
    const sinter = await this.redisService.sinter('setadd1', 'setadd2');
    console.log('sinter', sinter);
    console.log(setadd1, setadd2);

    return {
      message: 'Redis working',
      data: {
        sadd,
        sMeb,
        srem,
        sMeb2,
        sismember,
        sinter,
      },
    };
  }

  @Get('redis-zadd')
  @ApiOperation({
    summary: 'Test Redis Zadd',
  })
  @HttpCode(HttpStatus.OK)
  async testRedisZadd() {
    const zadd = await this.redisService.zadd(
      'mark',
      [83, 'chemistry'],
      [99, 'maths'],
      [100, 'english'],
      [90, 'computer_science'],
    );
    console.log('zadd', zadd);
    return {
      message: 'Redis working',
      data: {
        zadd,
      },
    };
  }

  @Get('redis-zrange')
  @ApiOperation({
    summary: 'Test Redis Zrange',
  })
  @HttpCode(HttpStatus.OK)
  async testRedisZrange() {
    const zRangeWithScores = await this.redisService.zRangeWithScores(
      'mark',
      0,
      -1,
    );
    console.log('zRangeWithScores', zRangeWithScores);
    const zRevRange = await this.redisService.zRevRange('mark', 0, -1);
    console.log('zRevRange', zRevRange);

    const zRank = await this.redisService.zRank('mark', 'chemistry');
    console.log('zRank', zRank);
    return {
      message: 'Redis working',
      data: {
        zRangeWithScores,
        zRevRange,
        zRank,
      },
    };
  }

  @Get('redis-hash')
  @ApiOperation({
    summary: 'Test Redis Hash',
  })
  @HttpCode(HttpStatus.OK)
  async testRedisHash() {
    const hset = await this.redisService.hset('person1', 'name', 'Saurav');
    await this.redisService.hset('person1', 'wife', 'Himani');
    await this.redisService.hset('person1', 'age', '30');
    console.log('hset', hset);
    const hget = await this.redisService.hget('person1', 'name');
    console.log('hget', hget);

    const hgetAll = await this.redisService.hgetAll('person1');
    console.log('hgetAll', hgetAll);
    return {
      message: 'Redis working',
      data: {
        hset,
        hget,
        hgetAll,
      },
    };
  }

  @Get('redis-hash-incrby')
  @ApiOperation({
    summary: 'Test Redis Hash Increment By',
  })
  @HttpCode(HttpStatus.OK)
  async testRedisHashIncrBy() {
    const hset = await this.redisService.hset('person1', 'age', '30');
    console.log('hset', hset);
    const hincrby = await this.redisService.hincrby('person1', 'age', 10);
    console.log('hincrby', hincrby);

    const hdecrby = await this.redisService.hdecrby('person1', 'age', 20);
    console.log('hdecrby', hdecrby);

    const hkeys = await this.redisService.hkeys('person1');
    console.log('hkeys', hkeys);

    const hvalues = await this.redisService.hvalues('person1');
    console.log('hvalues', hvalues);

    const hdeleted = await this.redisService.hdeleted('person1', 'age');
    console.log('hdeleted', hdeleted);

    const hexist = await this.redisService.hexist('person1', 'name');
    console.log('hexist', hexist);

    const hlen = await this.redisService.hlen('person1');
    console.log('hlen', hlen);

    return {
      message: 'Redis working',
      data: {
        hset,
        hincrby,
        hdecrby,
        hkeys,
        hvalues,
        hdeleted,
        hexist,
        hlen,
      },
    };
  }
}
