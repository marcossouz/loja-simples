module.exports = function(application){
    application.get("/cliente", function(req, res){
        application.app.controllers.cliente.cliente(application, req, res)
    })
}