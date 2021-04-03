const isProxyableObject = (target: any) => {
    switch(Object.prototype.toString.call(target)) {
        case '[object Object]':
            return true
        case '[object Map]':
            return true
        case '[object Set]':
            return true
        case '[object Array]':
            return true
    }
    return false
}

export {
    isProxyableObject
}