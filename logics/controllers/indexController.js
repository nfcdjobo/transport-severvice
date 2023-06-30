class IndexController{
    static async index(req, res){
        await res.send(`<!DOCTYPE html>
<html lang="en">
    <head>
        <title>form</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <a href='../' id='si'>Loc</a>
    </body>
</html>`)
    }
}

module.exports = IndexController;