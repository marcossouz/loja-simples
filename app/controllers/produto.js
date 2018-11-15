module.exports.menu = function (application, req, res) {
    res.render("./produto/menu");
}

module.exports.register = function (application, req, res) {
    res.render("./produto/register", { validacao: {}, dadosForm: {}, adicionado: { bool: 0 } });
}

module.exports.edit = function (application, req, res) {
    req.getConnection(function (error, conn) {
        conn.query('SELECT * FROM produto WHERE id = ' + req.params.id, function (err, rows, fields) {
            if (err) throw err;


            //if product not found
            if (rows.length <= 0) {
                req.flash('error', 'Product not found with id = ' + req.params.id);
                res.redirect('/produtos');
            } else {
                res.render('./produto/edit', {
                    title: 'Edit product',
                    id: rows[0].id,
                    nome: rows[0].nome,
                    preco: rows[0].preco,
                    validacao: {},
                    dadosform: {},
                    adicionado: { bool: 0 }
                })
            }
        })
    })
}

module.exports.list = function (application, req, res) {

    req.getConnection(function (error, conn) {
        conn.query('SELECT * FROM produto ORDER BY id', function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                res.render("./produto/list", {
                    title: 'Product List',
                    data: ''
                });
            } else {
                // render to views/user/list.ejs template file
                res.render("./produto/list", {
                    title: 'Product List',
                    data: rows
                });
            }
        })
    })
}

module.exports.save = function (application, req, res) {
    var dadosForm = req.body;
    req.assert('nomeProduto', 'Nome não pode ser vazio!').notEmpty();
    req.assert('precoProduto', 'Preco não pode ser vazio!').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        //res.send('existem erros no formulario');
        res.render('./produto/register', { validacao: erros, dadosForm: dadosForm, adicionado: { bool: 0 } });
        return;
    } else {
        var produto = {
            nome: req.sanitize('nomeProduto').escape().trim(),
            preco: req.sanitize('precoProduto').escape().trim()
        }

        req.getConnection(function (error, conn) {
            conn.query('INSERT INTO produto SET ?', produto, function (err, result) {
                if (err) {
                    req.flash('error', err)

                    res.render('./produto/register', {
                        title: 'Add new product',
                        nomeProduto: produto.nome,
                        precoProduto: produto.preco,
                        validacao: {},
                        adicionado: { bool: 0 },
                        dadosForm: {}
                    })
                } else {
                    req.flash('success', 'Data added succefully!')

                    res.render('./produto/register', {
                        title: 'Add new product',
                        nomeProduto: '',
                        precoProduto: '',
                        validacao: {},
                        adicionado: {
                            bool: 1,
                            msg: 'Produto adicionado com sucesso!'
                        },
                        dadosForm: {}
                    })
                }
            })
        })
    }
}

module.exports.update = function (application, req, res) {
    var dadosForm = req.body;
    req.assert('nomeProduto', 'Nome não pode ser vazio!').notEmpty();
    req.assert('precoProduto', 'Preco não pode ser vazio!').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        //res.send('existem erros no formulario');
        res.render('./produto/edit', { validacao: erros, dadosForm: dadosForm, adicionado: { bool: 0 } });
        return;
    } else {
        var produto = {
            nome: req.sanitize('nomeProduto').escape().trim(),
            preco: req.sanitize('precoProduto').escape().trim()
        }

        req.getConnection(function (error, conn) {
            conn.query('UPDATE produto  SET ? WHERE id = ' + req.params.id, produto, function (err, result) {
                if (err) {
                    req.flash('error', err)
                    res.render('./produto/edit', {
						title: 'Edit Product',
						id: req.params.id,
						nome: produto.nome,
                        preco: produto.preco,
                        validacao: {},
                        adicionado: { bool: 0 },
                        dadosForm: {}
					})

                } else {
                    req.flash('success', 'Data update succefully!')

                    res.render('./produto/edit', {
                        title: 'update product',
                        id: req.params.id,
                        nome: produto.nome,
                        preco: produto.preco,
                        validacao: {},
                        adicionado: {
                            bool: 1,
                            msg: 'Produto atualizado com sucesso!'
                        },
                        dadosForm: {}
                    })
                }
            })
        })
    }
}