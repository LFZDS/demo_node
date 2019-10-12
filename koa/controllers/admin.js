const get1 = async (ctx) => {
    ctx.response.body = 111;
}

const get2 = async (ctx) => {
    ctx.response.body = 222;
}

module.exports = {
    'GET /get1': get1,
    'GET /get2': get2
};