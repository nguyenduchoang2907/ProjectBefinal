module.exports = {
    port : process.env.SERVER_PORT || 8080,
    prefixApiVersion : process.env.SERVER_PREFIX_API_VERSION || "/api/v1",
    viewsFolder: `${__dirname}/../src/resources/views`,
    viewEngine:"ejs",
}