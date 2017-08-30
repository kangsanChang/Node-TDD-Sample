let users = [
    { id: 1, name: 'alice' },
    { id: 2, name: 'bek' },
    { id: 3, name: 'chris' },
];

module.exports.index = (req, res) => {
    req.query.limit = req.query.limit || 10; // req.query.limit이 오지 않으면 기본값으로 10
    const limit = parseInt(req.query.limit);
    if (Number.isNaN(limit)) { return res.status(400).end(); }
    res.json(users.slice(0, limit));
}

module.exports.show = (req, res) => {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) return res.status(400).end();
    const user = users.filter((users) => users.id === id)[0];
    if (!user) return res.status(404).end();
    res.json(user);
}

module.exports.destroy = (req, res) => {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) return res.status(400).end();
    users = users.filter(user => user.id !== id); // user.id가 같지 않은 애들만 배열로 가짐. 즉 삭제하고 난 배열
    res.status(204).end();
}

module.exports.create = (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).end();
    const isConflict = users.filter(user => user.name === name).length // data 중복 검사
    if (isConflict) return res.status(409).end();
    const id = Date.now();
    const user = { id, name };
    users.push(user);
    res.status(201).json(user);
}

module.exports.update = (req, res) => {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if (!name) return res.status(400).end();

    const isConflict = users.filter(user => user.name === name).length;
    if (isConflict) return res.status(409).end();

    const user = users.filter(user => user.id === id)[0];
    if (!user) return res.status(404).end();

    user.name = name;
    res.json(user);
}
