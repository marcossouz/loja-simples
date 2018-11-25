module.exports.list = function (application, req, res) {
    req.getConnection(function (error, conn) {
        conn.query('SELECT * FROM vendas ORDER BY id', function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                res.render("./vendas/list", {
                    title: 'Vendas List',
                    data: ''
                });
            } else {
                // render to views/user/list.ejs template file
                res.render("./vendas/list", {
                    title: 'Vendas List',
                    data: rows
                });
            }
        })
    })
}

module.exports.car = function (application, req, res) {
    var carrinho = req.body;

    req.getConnection(function (error, conn) {
        conn.query('SELECT * FROM produto WHERE id in (' + carrinho.dados + ')', function (err, rows, fields) {
            conn.query('SELECT * FROM clientes ORDER BY id', function (err, clientes, fields) {

                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    res.render("./vendas/car", {
                        title: 'Product List',
                        data: '',
                        clientes: ''
                    });
                } else {
                    // render to views/user/list.ejs template file
                    res.render("./vendas/car", {
                        title: 'Product List',
                        data: rows,
                        clientes: clientes
                    });
                }
            })
        })
    })
}

module.exports.receipt = function (application, req, res) {
    var v = req.body;
    var venda = JSON.parse(v.dados);
    var vendas = {
        cliente_id: venda.cliente.id
    }

    req.getConnection(function (error, conn) {


        conn.query('INSERT INTO vendas SET ?', vendas, function (err, result) {
            if (err) {
                req.flash('error', err)

                res.render('./vendas/receipt', {
                    title: 'Comprovante',
                    venda: {}
                })
            } else {
                conn.query('SELECT MAX(id) AS id FROM vendas', function (err, rows, fields) {
                    if (err) {
                        req.flash('error', err)

                        res.render('./vendas/receipt', {
                            title: 'Comprovante',
                            venda: {}
                        });
                    } else {
                        venda.produtos.forEach(function (produto) {

                            var valorParcial = produto.quantidade * produto.preco;
                            var produtos_venda = {
                                venda_id: rows[0].id,
                                produto_id: produto.id,
                                quantidade: produto.quantidade,
                                valor: valorParcial
                            }
                            conn.query('INSERT INTO produtos_venda SET ?', produtos_venda, function (err, result) {
                                if (err) {
                                    req.flash('error', err)

                                    res.render('./vendas/receipt', {
                                        title: 'Comprovante',
                                        venda: {}
                                    })
                                } else {
                                    req.flash('success', 'Comprovante')

                                    res.render("./vendas/receipt", {
                                        title: 'comprovante',
                                        venda: v.dados
                                    });
                                }
                            })
                        })
                    }
                })
            }
        })
    })
}