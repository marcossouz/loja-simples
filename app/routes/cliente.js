module.exports = function(application){
    application.get("/clientes", function(req, res){
        application.app.controllers.cliente.list(application, req, res)
    })

    application.get("/clientes/register", function(req, res){
        application.app.controllers.cliente.register(application, req, res)
    })

    application.post("/clientes", function(req, res){
        application.app.controllers.cliente.save(application, req, res)
    }) 

    application.get("/clientes/(:id)", function(req, res){
        application.app.controllers.cliente.edit(application, req, res)
    })
    
    application.put("/clientes/(:id)", function(req, res){
        application.app.controllers.cliente.update(application, req, res)
    })

    application.delete("/clientes/(:id)", function(req, res){
        application.app.controllers.cliente.delete(application, req, res)
    })
}