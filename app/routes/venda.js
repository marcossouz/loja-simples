module.exports = function(application){
    application.get("/vendas", function(req, res){
        application.app.controllers.venda.list(application, req, res)
    })
    
    application.post("/carrinho", function(req, res){
        application.app.controllers.venda.car(application, req, res)
    })
    
    application.post("/comprovante", function(req, res){
        application.app.controllers.venda.receipt(application, req, res)
    })
}