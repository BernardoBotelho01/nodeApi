import { DataSource } from "typeorm";
import { ProductCategory } from "../entity/ProductCategory.js";
export default class CreateProductCategorySeeds {
    async run(dataSourse) {
        console.log("Iniciando o seed para a tabela `product_categories´...");
        const categoryRepository = dataSourse.getRepository(ProductCategory);
        const existingCount = await categoryRepository.count();
        if (existingCount) {
            console.log("A tabela `product_categories´ ja posssui dados. Nenhuma alteração foi realizada!");
            return;
        }
        const category = [
            { name: "Alimentos" },
            { name: "Roupas" },
            { name: "Eletrônicos" }
        ];
        await categoryRepository.save(category);
        console.log("Seed concluido com sucesso: categorias cadastradas");
    }
}
//# sourceMappingURL=CreateProductCategorySeeds.js.map