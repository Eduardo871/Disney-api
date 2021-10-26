class Crud {
    constructor(db){
        this.db = db;
    }
    async create(content){
        try { 
            const  created = await this.db.create(content); 
            return {message:"action complete", content:created}
        } catch (error) {
            return {message:"action incomplete", content: error}
        }     
    }
    async update(content, id){
        try {
            const dataUpdate = await this.db.findByPk(id);
            const updated = await dataUpdate.update(content);
            return {message:"action complete", content: updated}
        } catch (error) {
            return {message:"action incomplete", content: error}
        }  
    }
    async delete(content){
        try {
            const dataDelete = await this.db.findByPk(content);
            const deleted = await dataDelete.destroy()
            return {message: "action complete", content: deleted}
        } catch (error) {
            return {message:"action incomplete", content: error}
        }
    }
    async getAll(content){
        try {
            const get = await this.db.findAll({
                ...content
            });
            return {message: "action complete", content: get}
        } catch (error) {
            return {message:"action incomplete", content: error}
        }
    }
    async getByOne (content){
        try {
            const getContent = await this.db.findOne({
                ...content
            });
            return {message: "action complete", content: getContent}
        } catch (error) {
            return {message:"action incomplete", content: error}
        }
    }
    async relation (content, tableInter){
        try {
            const relation = tableInter.create(content);
            return {message: "action complete", content: relation}
        } catch (error) {
            return {message:"action incomplete", content: error}
        }
    }    
   

}

module.exports = Crud;