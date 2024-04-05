

exports.genID = () => {
    const id =  Array.from({ length: 8 }, () => Math.random().toString(36).charAt(2)).join('').toUpperCase();
    return id
}