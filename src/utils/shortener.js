function generateShortUrl(longUrl) {
    const baseUrl = 'http://short.ly/';
    const uniqueId = Math.random().toString(36).substring(2, 8);
    return baseUrl + uniqueId;
}

module.exports = generateShortUrl;