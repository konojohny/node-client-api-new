import Client from "../models/Client.js";
import { ClientDto } from "../dtos/ClientDto.js";

const client = new Client(); 

class clientServices {
    static async list(next) {
        const listAll = await client.search();

        if (Object.keys(listAll).length === 0) {
            return next(new Error("Não Encontramos Clientes"));
        }

        return listAll.map(client => new ClientDto(client));
    }

    static async listId(id, next) {
        await this.verifyIdCpf(null, id, next);
    
        const listId = await client.searchId(id);
    
        return new ClientDto(listId);
    }

    static async create(name, cpf, dateBirth, next) {
        await this.verifyIdCpf(cpf, null, next);
        await this.verifyTypes(name, cpf, dateBirth, next);

        const createdClient = await client.create(name, cpf, dateBirth);

        return new ClientDto(createdClient);
    }

    static async update(id, name, cpf, dateBirth, next) {
        await this.verifyIdCpf(null, id, next);
        await this.verifyIdCpf(cpf, id, next);
        await this.verifyTypes(name, cpf, dateBirth, next);

        const updateClient = await client.update(id, name, cpf, dateBirth); 

        console.log(`updateClient = ${updateClient}`);

        return new ClientDto(updateClient);
    }

    static async deleteClientId(id, next) {
        await this.verifyIdCpf(null, id, next);

        const deleteClient = await client.deleteClient(id);

        return new ClientDto(deleteClient);
    }

    static async verifyIdCpf(cpf, id, next) {
        const result = await client.verifyIdCpf(cpf, id); 

        if (cpf && result) {
            return next(new Error(`o CPF ${cpf} já existe.`));
        } 
        
        if (id && !result) {
            return next(new Error(`o ID não existe.`));
        }
    }

    static async verifyTypes(name, cpf, dateBirth, next) {
        if (!name || typeof name !== "string" || !isNaN(name)) {
            return next(new Error(`O nome deve ser um valor válido.`));
        }

        cpf = cpf.replace(/[.-]/g, '');

        if (cpf.length !== 11 || isNaN(cpf)) {
            return next(new Error(`O CPF deve ser válido.`));
        }

        const date = new Date(dateBirth);

        if (isNaN(date.getTime())) {
            return next(new Error(`A data ${dateBirth} deve ser válida.`));
        }
    }    
}

export default clientServices;