module.exports = function(application){
    application.get("/produtos", function(req, res){
        application.app.controllers.produto.list(application, req, res)
    })
    
    application.get("/produtos/register", function(req, res){
        application.app.controllers.produto.register(application, req, res)
    })

    application.post("/produtos", function(req, res){
        application.app.controllers.produto.save(application, req, res)
    }) 

    application.get("/produtos/(:id)", function(req, res){
        application.app.controllers.produto.edit(application, req, res)
    })
    
    application.put("/produtos/(:id)", function(req, res){
        application.app.controllers.produto.update(application, req, res)
    })

    application.delete("/produtos/(:id)", function(req, res){
        application.app.controllers.produto.delete(application, req, res)
    })
}