import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User.js";
import { Situation } from "./entity/Situation.js";
import { Product } from "./entity/Product.js";
import { ProductCategory } from "./entity/ProductCategory.js";
import { ProductSituation } from "./entity/ProductSituation.js";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dialect = (process.env.DB_DIALECT ?? "postgres");
export const AppDataSource = new DataSource({
    type: dialect,
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [User, Situation, Product, ProductCategory, ProductSituation],
    migrations: [join(__dirname, "migration", "*.js")],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map