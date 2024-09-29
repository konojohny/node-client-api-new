import Client from "../models/Client.js";
import { ClientDto } from "../dtos/ClientDto.js";

const client = new Client(); 

class clientServices {
    static async list() {
        const listAll = await client.search();

        if(Object.keys(listAll).length === 0){
            throw new Error("Não Encontramos Clientes");
        }

        return  listAll.map(client => new ClientDto(client));
    }

    static async listId(id) {
        await this.verifyIdCpf(null, id);

        const listId = await client.searchId(id);

        return new ClientDto(listId);
    }

    static async create(name, cpf, dateBirth) {
        await this.verifyIdCpf(cpf, null);

        await this.verifyTypes(name, cpf, dateBirth);

        const createdClient = await client.create(name, cpf, dateBirth);

        return new ClientDto(createdClient);
    }

    static async update(id, name, cpf, dateBirth) {
        await this.verifyIdCpf(null, id);

        await this.verifyIdCpf(cpf, id);

        await this.verifyTypes(name, cpf, dateBirth);

        const updateClient = await client.update(id, name, cpf, dateBirth); 

        console.log(`updateCLient = ${updateClient}`);

        return new ClientDto(updateClient);
    }

    static async deleteClientId(id){
        await this.verifyIdCpf(null, id);

        const deleteClient = await client.deleteClient(id);

        return new ClientDto(deleteClient);
    }

    static async verifyIdCpf(cpf, id){
        const result = await client.verifyIdCpf(cpf, id); 

        if(cpf && !id){
            if(result){
                throw new Error(`o CPF ${cpf} ja existe.`);
            }
        }else if(cpf && id){
            if(result){
                throw new Error(`o CPF ${cpf} ja existe.`);
            }
        }else if(!cpf && id){
            if(!result){
                throw new Error(`o ID não existe.`);
            }
        }
    }

    static async verifyTypes(name, cpf, dateBirth) {
        if (!name || typeof name !== "string" || !isNaN(name)) {
            throw new Error(`O nome deve ser um valor válido.`);
        }

        cpf = cpf.replace(/[.-]/g, '');

        if (cpf.length !== 11 || isNaN(cpf)) {
            throw new Error(`O CPF deve ser válido.`);
        }

        const date = new Date(dateBirth);

        if (isNaN(date.getTime())) {
            throw new Error(`A data ${dateBirth} deve ser válida.`);
        }
    }    
}

export default clientServices;