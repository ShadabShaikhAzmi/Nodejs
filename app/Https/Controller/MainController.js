function MainController() {
    return {
        main(req,res){
            res.send(`<center><h1>Express-Nodejs Server</h1></center>`);
        } 
    }   
}

module.exports = MainController;