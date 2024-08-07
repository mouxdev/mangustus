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

capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
    if (field.enum) {
        return {
            type: "String",
            enum: field.enum
        }
    }
    return { type: capitalize(field.type) }
}