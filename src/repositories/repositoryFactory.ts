import ApiNoAuthRepository from "./apiNoAuthRepository";
import ApiAuthRepository from "./apiAuthRepository";

export const RepositoryApiNoAuth = ApiNoAuthRepository;
export const RepositoryApiAuth = ApiAuthRepository;

export const RepositoryFactory = {
    RepositoryApiNoAuth,
    RepositoryApiAuth
}