export class PaginationService {
    static async paginate(repository, page = 1, limite = 10, order = {}) {
        const totalRecords = await repository.count();
        const lastPage = Math.ceil(totalRecords / limite);
        if (page > lastPage && lastPage > 0) {
            throw new Error(`Paginas invalidas. Total de paginas: ${lastPage}`);
        }
        const offset = (page - 1) * limite;
        const data = await repository.find({
            take: limite,
            skip: offset,
            order,
        });
        return {
            error: false,
            data,
            currentPage: page,
            lastPage,
            totalRecords
        };
    }
}
//# sourceMappingURL=PaginationService.js.map