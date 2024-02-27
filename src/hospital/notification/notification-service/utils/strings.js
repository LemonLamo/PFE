exports.format = (format, data) => {
    return String(format).replace(/\${(.*?)}/g, (match, p1) => data[p1.trim()] || match);
};