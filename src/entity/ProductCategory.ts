import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Product } from "./Product.js";

@Entity("product_categories")
export class ProductCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createAt!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updateAt!: Date;

  @OneToMany(() => Product, (product) => product.productCategory)
  products!: Product[];

  
}
