const HomeResponse = (req, res) => {
    res.write("Hey welcome ");
    res.write("utkarsh EXPRESS ssssss");
    res.end();
}

module.exports = {HomeResponse}