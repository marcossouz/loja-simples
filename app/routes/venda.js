module.exports = function(application){
    application.get("/venda", function(req, res){
        application.app.controllers.venda.venda(application, req, res)
    })
}