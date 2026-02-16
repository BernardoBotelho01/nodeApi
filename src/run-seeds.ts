import { AppDataSource } from "./data-source.js";
import CreateSituationSeeds from "./seeds/CreateSituationSeeds.js";
import CreateUserSeeds from "./seeds/CreateUserSeeds.js";
import CreateProductCategorySeeds from "./seeds/CreateProductCategorySeeds.js";
import CreateProductSituationSeeds from "./seeds/CreateProductSituationSeeds.js";
import CreateProductSeeds from "./seeds/CreateProductSeeds.js";


const runSeeds = async()=>{
    console.log("Conectado ao banco de dados...");

    await AppDataSource.initialize();
    console.log("Banco de dados conectado!")

    try{
        // cria a instancia da classes seed
        const situationsSeeds = new CreateSituationSeeds();
        // executa as seeds
        await situationsSeeds.run(AppDataSource);


        const userSeeds = new CreateUserSeeds();
        await userSeeds.run(AppDataSource);


        const categorySeeds = new CreateProductCategorySeeds();
        await categorySeeds.run(AppDataSource);

        const productSituation = new CreateProductSituationSeeds();
        await productSituation.run(AppDataSource);

        const product = new CreateProductSeeds();
        await product.run(AppDataSource);

        console.log("Todas a seeds foram executadas com sucesso!")

    }
    catch(error){
        console.log("Erro ao executar o seed:", error)
    }
    finally{
        await AppDataSource.destroy();
        console.log("Conexão com o banco de dados encerrado!")
    }
};

runSeeds();