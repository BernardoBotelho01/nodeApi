import { DataSource } from "typeorm"
import { Product } from "../entity/Product.js"
import { ProductSituation } from "../entity/ProductSituation.js"
import { ProductCategory } from "../entity/ProductCategory.js"

export default class CreateProductSeeds {

    public async run (dataSourse: DataSource): Promise<void>{
        console.log("Iniciando o seed para a tabela `products´...")

        const productRepository = dataSourse.getRepository(Product);
        const situationRepository = dataSourse.getRepository(ProductSituation);
        const categoryRepository = dataSourse.getRepository(ProductCategory);

        const existingCount = await productRepository.count();

        if(existingCount){
            console.log("A tabela `Products´ ja posssui dados. Nenhuma alteração foi realizada!");
            return;
        }

        // Busca as categorias ja cadastradas
        const alimentos = await categoryRepository.findOne({
            where: { name: "Alimentos" }
        });

        const roupas = await categoryRepository.findOne({
            where: { name: "Roupas" }
        });

        const eletronicos = await categoryRepository.findOne({
            where: { name: "Eletrônicos" }
        });

        if(!alimentos || !roupas || !eletronicos){
            console.log("Categorias necessárias não encontradas. Execute o seed de categorias primeiro.");
            return;
        }

        // Busca as situations já cadastradas
        const ativo = await situationRepository.findOne({
            where: { name: "Ativo" }
        });

        const inativo = await situationRepository.findOne({
            where: { name: "Inativo" }
        });

        const pendente = await situationRepository.findOne({
            where: { name: "Pendente" }
        });

        if(!ativo || !inativo || !pendente){
            console.log("Situações necessárias não encontradas. Execute o seed de Situation primeiro.");
            return;
        }

        const product = [
            {
                name: "Computador",
                productCategory: eletronicos,
                productSituation: ativo

            },
            {
                name: "Arroz",
                productCategory: alimentos,
                productSituation: ativo
            }
        ]

        await productRepository.save(product);

        console.log("Seed concluido com sucesso: produtos cadastrados")
    }
}
