const {get, set} = require('./_redis');
const {getBlogListByUser} = require('../services/blog');

const KEY_PREFIX = 'TwiDDer:square:';

async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`;

    const cacheResult = await get(key);
    if (cacheResult != null) {
        return cacheResult;
    }

    const result = await getBlogListByUser({pageIndex, pageSize});

    set(key, result, 60);

    return result;
}

async function getSquareListFromDB(pageIndex, pageSize) {
    return await getBlogListByUser({pageIndex, pageSize});
}

module.exports = {
    getSquareCacheList,
    getSquareListFromDB
};
