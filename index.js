module.exports = function (string) {
    const obj = JSON.parse(string)
    let ret = parseObject(obj.properties)
    return JSON.stringify(ret)
}

snakeToCamel = (str) => {
    return str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', ''))
}

capitalizeFirstLetter = (str) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

parseObject = (obj) => {
    let ret = {};
    for (const f of Object.getOwnPropertyNames(obj)) {
        ret[snakeToCamel(f)] = parseField(obj[f])
    }
    return ret
}

parseField = (field) => {
    if (field.type === "object") {
        return parseObject(field.properties)
    }
    if (field.type === "array") {
        return [parseField(field.items)]
    }
    return { type: capitalize(field.type) }
}