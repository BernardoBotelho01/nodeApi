import type { ObjectLiteral, Repository, FindOptionsOrder } from "typeorm";
interface paginationResult<T> {
    error: boolean;
    data: T[];
    currentPage: number;
    lastPage: number;
    totalRecords: number;
}
export declare class PaginationService {
    static paginate<T extends ObjectLiteral>(repository: Repository<T>, page?: number, limite?: number, order?: FindOptionsOrder<T>): Promise<paginationResult<T>>;
}
export {};
//# sourceMappingURL=PaginationService.d.ts.map