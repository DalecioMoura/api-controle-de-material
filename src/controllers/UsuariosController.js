const UsuariosServices = require('../services/UsuariosServices');

module.exports = {
    async listarUsuarios(req, res){
        let json = {error:'', result:[]};

        let usuarios = await UsuariosServices.listarUsuarios();

        for(let i in usuarios){
            json.result.push({
                id:usuarios[i].id,
                matricula:usuarios[i].matricula,
                nome:usuarios[i].nome,
                apelido:usuarios[i].apelido,
                setor:usuarios[i].setor
            });
        }
        res.json(json);
    },

    async cadastrarUsuario(req, res){
        let json = {error:'', result:[]};
        console.log('chegou no controller')
        console.log(req.body)

        let obj = {
            matricula:req.body.matricula,
            nome:req.body.nome,
            apelido:req.body.apelido,
            setor:req.body.setor
        }

        if(obj.matricula && obj.nome && obj.apelido){
            let usuario = await UsuariosServices.cadastrarUsuario(obj);
            console.log(usuario[0]);
            json.result = await UsuariosServices.listarUsuarios(usuario[0].id);
        }else{
            json.error = 'Usuário não cadastrado'
        }
        res.json(json);
    },

    async modificarUsuario(req, res){
        let json = {error:'', result:[]}

        let obj = {
            id:req.params.id,
            matricula:req.body.matricula,
            nome:req.body.nome,
            apelido:req.body.apelido,
            setor:req.body.setor
        };
        if(obj.matricula && obj.nome){
            let usuario = await UsuariosServices.modificarUsuario(obj);
            console.log(usuario);
            json.result = await UsuariosServices.modificarUsuario(obj.id);
        
        }else{
            json.error = 'Dados não enviados!'
        }
        res.json(json);

    },
    
    async deletarUsuario(req, res){
        let json = {error:'', result:[]};

        let id = req.params.id;

        if(id)
            await UsuariosServices.deletarUsuario(id);
    }
}