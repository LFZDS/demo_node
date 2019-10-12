const post1 = async() => {
    console.log(1111);
}

const post2 = async() => {
    console.log(1111);
}

module.exports = {
    'POST /post1': post1,
    'POST /post2': post2
};