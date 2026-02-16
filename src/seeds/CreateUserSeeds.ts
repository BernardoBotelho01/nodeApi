import { DataSource } from "typeorm"
import { User } from "../entity/User.js"
import { Situation } from "../entity/Situation.js"

export default class CreateUserSeeds {

    public async run (dataSourse: DataSource): Promise<void>{
        console.log("Iniciando o seed para a tabela `User´...")

        const userRepository = dataSourse.getRepository(User);
        const situationRepository = dataSourse.getRepository(Situation);

        const existingCount = await userRepository.count();

        if(existingCount){
            console.log("A tabela `users´ ja posssui dados. Nenhuma alteração foi realizada!");
            return;
        }

        // Busca as situations já cadastradas
        const ativo = await situationRepository.findOne({
            where: { nameSituation: "Ativo" }
        });

        const inativo = await situationRepository.findOne({
            where: { nameSituation: "Inativo" }
        });

        const pendente = await situationRepository.findOne({
            where: { nameSituation: "Pendente" }
        });

        if(!ativo || !inativo || !pendente){
            console.log("Situações necessárias não encontradas. Execute o seed de Situation primeiro.");
            return;
        }

        const users = [
            {
                name: "João Silva",
                email: "joao@email.com",
                situation: ativo
            },
            {
                name: "Maria Souza",
                email: "maria@email.com",
                situation: inativo
            }
        ]

        await userRepository.save(users);

        console.log("Seed concluido com sucesso: usuários cadastrados")
    }
}
