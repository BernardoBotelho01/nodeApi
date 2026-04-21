import { DataSource } from "typeorm";
import { User } from "../entity/User.js";
import { Situation } from "../entity/Situation.js";

export default class CreateUserSeeds {
  public async run(dataSource: DataSource): Promise<void> {
    console.log("Iniciando o seed para a tabela `User`...");

    const userRepository = dataSource.getRepository(User);
    const situationRepository = dataSource.getRepository(Situation);

    const metadata = dataSource.getMetadata(User);
    console.log("Colunas de User:", metadata.columns.map(column => column.propertyName));

    const existingCount = await userRepository.count();

    if (existingCount > 0) {
      console.log("A tabela `users` ja possui dados. Nenhuma alteração foi realizada!");
      return;
    }

    const ativo = await situationRepository.findOne({
      where: { nameSituation: "Ativo" },
    });

    const inativo = await situationRepository.findOne({
      where: { nameSituation: "Inativo" },
    });

    if (!ativo || !inativo) {
      console.log("Situações necessárias não encontradas. Execute o seed de Situation primeiro.");
      return;
    }

        const users = [
            {
                name: "João Silva",
                email: "joao@email.com",
                password: "123456",
                situation: ativo
            },
            {
                name: "Maria Souza",
                email: "maria@email.com",
                password: "123457",
                situation: inativo
            }
        ]

        await userRepository.save(users);

        console.log("Seed concluido com sucesso: usuários cadastrados")
    }
}
