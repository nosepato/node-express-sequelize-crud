const db = require("../models");
const Item = db.items;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Conteúdo não pode ser vazio!"
        });
        return;
    }

    const item = {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        is_flammable: req.body.is_flammable ? req.body.is_flammable: false
    }

    Item.create(item)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Algum erro aconteceu ao tentar criar um item."
        })
    })
};


exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%`} } :null;

    console.log(req);

    Item.findAll({where: condition})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Algum erro aconteceu ao tentar pesquisar pelos itens."
        })
    })
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Item.findByPk(id)
        .then(data => {
            if (data){
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Não foi possível encontrar um item com o id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao tentar encontrar um item com o id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Item.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "O item foi atualizado de maneira bem sucedida."
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar o item com o id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao tentar atualizar um item como o id=" + id
            });
        });   
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Item.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "O item foi apagado com sucesso!"
                });
            } else {
                res.send({
                    message: `Não foi possível apagar o item com o id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao tentar apagar o item com o id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Item.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} itens foram apagados com sucesso.`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu ao tentar apagar todos os itens."
            });
        });
};

exports.findAllFlammables = (req, res) => {
    Item.findAll({ where: { isFlammable: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Algum erro ocorreu ao tentar pesquisar todos os itens inflamáveis."
        });
    });
};