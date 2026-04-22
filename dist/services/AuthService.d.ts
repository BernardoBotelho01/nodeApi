export declare class AuthService {
    private userRepository;
    login(email: string, password: string): Promise<{
        id: number;
        name: string;
        email: string;
        token: string;
    }>;
}
//# sourceMappingURL=AuthService.d.ts.map