import { DataSource } from "typeorm";
import { User } from "../entity/User.js";
import { Situation } from "../entity/Situation.js";
import bcrypt from "bcryptjs";

export default class CreateUserSeeds {
  public async run(dataSource: DataSource): Promise<void> {
    console.log("Iniciando o seed para a tabela `User`...");

    const userRepository = dataSource.getRepository(User);
    const situationRepository = dataSource.getRepository(Situation);

    const existingCount = await userRepository.count();

    if (existingCount > 0) {
      console.log("A tabela `users` já possui dados. Nenhuma alteração foi realizada!");
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
        password: await bcrypt.hash("123458", 10),
        recoverPassword: null,
        situation: ativo,
      },
      {
        name: "Maria Souza",
        email: "maria@email.com",
        password: await bcrypt.hash("123457", 10),
        recoverPassword: null,
        situation: inativo,
      },
    ];

    await userRepository.save(users);

    console.log("Seed concluído com sucesso: usuários cadastrados");
  }
}
