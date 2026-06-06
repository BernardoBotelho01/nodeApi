import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { Situation } from "./Situation.js";
import bcrypt from "bcryptjs";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  password!: string;

  @Column({
    unique: true,
    type: "varchar",
    length: 255,
    nullable: true,
  })
  recoverPassword!: string | null;

  @ManyToOne(() => Situation, (situation) => situation.users)
  @JoinColumn({ name: "situationId" })
  situation!: Situation;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createAt!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updateAt!: Date;


 @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password && !this.password.startsWith("$2")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  async comparePassword(password:string): Promise<boolean>{
    return bcrypt.compare(password, this.password)
  };
}
