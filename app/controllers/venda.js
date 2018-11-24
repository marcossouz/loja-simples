module.exports.list = function (application, req, res) {
    res.render("./vendas/list");
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
