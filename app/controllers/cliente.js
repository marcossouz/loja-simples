module.exports.register = function (application, req, res) {
    res.render("./clientes/register", { validacao: {}, dadosForm: {}, adicionado: { bool: 0 } });
}

module.exports.edit = function (application, req, res) {
    req.getConnection(function (error, conn) {
        conn.query('SELECT * FROM clientes WHERE id = ' + req.params.id, function (err, rows, fields) {
            if (err) throw err;


            //if product not found
            if (rows.length <= 0) {
                req.flash('error', 'Cliente not found with id = ' + req.params.id);
                res.redirect('/clientes');
            } else {
                res.render('./clientes/edit', {
                    title: 'Edit cliente',
                    id: rows[0].id,
                    nome: rows[0].nome,
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
        conn.query('SELECT * FROM clientes ORDER BY id', function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                res.render("./clientes/list", {
                    title: 'Cliente List',
                    data: ''
                });
            } else {
                // render to views/user/list.ejs template file
                res.render("./clientes/list", {
                    title: 'Cliente List',
                    data: rows
                });
            }
        })
    })
}

module.exports.save = function (application, req, res) {
    var dadosForm = req.body;
    req.assert('nomeCliente', 'Nome não pode ser vazio!').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        //res.send('existem erros no formulario');
        res.render('./clientes/register', { validacao: erros, dadosForm: dadosForm, adicionado: { bool: 0 } });
        return;
    } else {
        var cliente = {
            nome: req.sanitize('nomeCliente').escape().trim()
        }

        req.getConnection(function (error, conn) {
            conn.query('INSERT INTO clientes SET ?', cliente, function (err, result) {
                if (err) {
                    req.flash('error', err)

                    res.render('./clientes/register', {
                        title: 'Add new cliente',
                        nomeCliente: cliente.nome,
                        validacao: {},
                        adicionado: { bool: 0 },
                        dadosForm: {}
                    })
                } else {
                    req.flash('success', 'Data added succefully!')

                    res.render('./clientes/register', {
                        title: 'Add new cliente',
                        nomeCliente: '',
                        validacao: {},
                        adicionado: {
                            bool: 1,
                            msg: 'Cliente adicionado com sucesso!'
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
    req.assert('nomeCliente', 'Nome não pode ser vazio!').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        //res.send('existem erros no formulario');
        res.render('./clientes/edit', { validacao: erros, dadosForm: dadosForm, adicionado: { bool: 0 } });
        return;
    } else {
        var cliente = {
            nome: req.sanitize('nomeCliente').escape().trim()
        }

        req.getConnection(function (error, conn) {
            conn.query('UPDATE clientes  SET ? WHERE id = ' + req.params.id, cliente, function (err, result) {
                if (err) {
                    req.flash('error', err)
                    res.render('./clientes/edit', {
						title: 'Edit Product',
						id: req.params.id,
						nome: cliente.nome,
                        validacao: {},
                        adicionado: { bool: 0 },
                        dadosForm: {}
					})

                } else {
                    req.flash('success', 'Data update succefully!')

                    res.render('./clientes/edit', {
                        title: 'update cliente',
                        id: req.params.id,
                        nome: cliente.nome,
                        validacao: {},
                        adicionado: {
                            bool: 1,
                            msg: 'Cliente atualizado com sucesso!'
                        },
                        dadosForm: {}
                    })
                }
            })
        })
    }
}

module.exports.delete = function (application, req, res) {
    var cliente = { id: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM clientes WHERE id = ' + req.params.id, cliente, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to users list page
				res.redirect('/clientes')
			} else {
				req.flash('success', 'Cliente deleted successfully! id = ' + req.params.id)
				// redirect to users list page
				res.redirect('/clientes')
			}
		})
	})
}
