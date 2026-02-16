import { DataSource } from "typeorm";
import { Situation } from "../entity/Situation.js";
export default class CreateSituationSeeds {
    async run(dataSourse) {
        console.log("Iniciando o seed para a tabela `Situation´...");
        const situationRepository = dataSourse.getRepository(Situation);
        const existingCount = await situationRepository.count();
        if (existingCount) {
            console.log("A tabela `situatios´ ja posssui dados. Nenhuma alteração foi realizada!");
            return;
        }
        const situations = [
            { nameSituation: "Ativo" },
            { nameSituation: "Inativo" },
            { nameSituation: "Pendente" }
        ];
        await situationRepository.save(situations);
        console.log("Seed concluido com sucesso: situações cadastradas");
    }
}
//# sourceMappingURL=CreateSituationSeeds.js.map