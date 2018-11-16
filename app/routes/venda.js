module.exports = function(application){
    application.get("/vendas", function(req, res){
        application.app.controllers.venda.list(application, req, res)
    })
}