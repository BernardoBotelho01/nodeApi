import { DataSource } from "typeorm"
import { ProductSituation } from "../entity/ProductSituation.js"


export default class CreateProductSituationSeeds{

    public async run (dataSourse: DataSource): Promise<void>{
        console.log("Iniciando o seed para a tabela `product_situations´...")

        const situationRepository = dataSourse.getRepository(ProductSituation);

        const existingCount = await situationRepository.count();

        if(existingCount){
            console.log("A tabela `product_situations´ ja posssui dados. Nenhuma alteração foi realizada!");
            return;
        }

        const situation = [
            {name: "Ativo"},
            {name: "Inativo"},
            {name: "Pendente"}
        ]

        await situationRepository.save(situation);

        console.log("Seed concluido com sucesso: situações cadastradas")
    }
}