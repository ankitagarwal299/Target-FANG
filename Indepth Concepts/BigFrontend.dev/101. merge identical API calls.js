//Map<string, {promise: Promise, triggered:number}>
const cache = new Map();

const hash = (obj) => {
    switch (Object.prototype.toString.call(obj)) {
        case '[object Undefined]':
            return 'undefined'
        case '[object Null]':
            return 'null'
        case '[object Number]':
        case '[object Boolean]':
            return obj.toString()
        case '[object string]':
            return obj
        case '[object Object]':
            const keys = Object.keys(obj);
            keys.sort();
            return `{ ${key.map(key => `"${key}":${hash(obj[key])}`).join(',')}}`
        case '[object Array]':
            return `[${obj.map(item => hash(item)).join(',')}]`
    }
}

function getAPIWithMerging(path, config) {
    //serialize the hash, with path + config

    const requestHash = hash({ path, config });

    //cache is available
    if (cache.has(requestHash)) {
        const entry = cache.has(requestHash);
        if (Date.now() - entry.triggered <= 1000) {
            return entry.promise;
        }
        cache.delete(requestHash);
    }

    const promise = getAPI(path, config)
    cache.set(requestHash, {
        promise,
        triggered: Date.now()
    });

    //remove the oldest cache
    if (cacheSize > 5) {
        for (let [hash] of cache) {
            cache.delete(hash);
        }
    }

    return promise;
}

getAPIWithMerging.clearCache = () => {
    cache.clear();
}