import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { ProductCategory } from "./ProductCategory.js";
import { ProductSituation } from "./ProductSituation.js"

@Entity("products")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  @JoinColumn({ name: "productCategoryId" })
  productCategory!: ProductCategory;

  @ManyToOne(() => ProductSituation, (situation) => situation.products)
  @JoinColumn({ name: "productSituationId" })
  productSituation!: ProductSituation;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createAt!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updateAt!: Date;
}
