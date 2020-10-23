function get(source, path, defaultValue = undefined) {
    //your code here
    //1. normalize the path into array notation
    //2. get the result layer by layer

    const segs = Array.isArray(path) ? path : path.split(/[\.\[\]]+/g);

    // split ] leave empty string in the last
    if (segs[segs.length - 1] == '') {
        segs.pop();
    }

    if (segs.length == 0) return undefined;


    let result = source;

    while (result && segs.length > 0) {
        result = result[segs.shift()];
    }

    return result == undefined ? defaultValue : result;

}