import clientServices from "../services/services.js";

class clientController {
    static async listClients(req, res, next) {
        try {
            const listClient = await clientServices.list(next);
            res.status(200).json(listClient);
        } catch (error) {
            next(error);
        }
    }

    static async listClientsId(req, res, next) {
        try {
            const listClient = await clientServices.listId(req.params.id, next);
            res.status(200).json(listClient);
        } catch (error) {
            next(error);
        }
    }

    static async createClient(req, res, next) {
        try {
            const { name, cpf, dateBirth } = req.body;
            const createdClient = await clientServices.create(name, cpf, dateBirth, next);
            res.status(201).send({ message: "Cliente Criado", data: createdClient });
        } catch (error) {
            next(error);
        }
    }

    static async updateClient(req, res, next) {
        try {
            const { name, cpf, dateBirth } = req.body;
            const result = await clientServices.update(req.params.id, name, cpf, dateBirth, next);
            res.status(201).send({ message: "Cliente Atualizado", data: result });
        } catch (error) {
            next(error);
        }
    }

    static async deleteClient(req, res, next) {
        try {
            const result = await clientServices.deleteClientId(req.params.id, next);
            res.status(201).send({ message: "Cliente Deletado", data: result });
        } catch (error) {
            next(error);
        }
    }
}

export default clientController;