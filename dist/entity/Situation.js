var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { User } from "./User.js";
let Situation = class Situation extends BaseEntity {
    id;
    nameSituation;
    createAt;
    updateAt;
    users;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Situation.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Situation.prototype, "nameSituation", void 0);
__decorate([
    Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Situation.prototype, "createAt", void 0);
__decorate([
    Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Situation.prototype, "updateAt", void 0);
__decorate([
    OneToMany(() => User, (user) => user.situation),
    __metadata("design:type", Array)
], Situation.prototype, "users", void 0);
Situation = __decorate([
    Entity("situations")
], Situation);
export { Situation };
//# sourceMappingURL=Situation.js.map