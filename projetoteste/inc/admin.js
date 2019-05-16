module.exports = {

    getParams(req, params){

        return Object.assign({}, {
            menus: req.menus,
            user: req.session.user
        }, params);

    }

}