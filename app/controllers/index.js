module.exports.index = function(application, req, res){

    req.getConnection(function (error, conn) {
        conn.query('SELECT * FROM produto ORDER BY id', function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                res.render("index", {
                    title: 'Product List',
                    data: ''
                });
            } else {
                // render to views/user/list.ejs template file
                res.render("index", {
                    title: 'Product List',
                    data: rows
                });
            }
        })
    })
}