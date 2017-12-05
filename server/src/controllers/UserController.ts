import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { Transaction } from "../entity/Transaction";

export class UserController {

    private userRepository = getRepository(User);
    private transactionRepository = getRepository(Transaction);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.transactionRepository.find({take: 10, relations: ['product', 'customer']});
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOneById(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        await this.userRepository.removeById(request.params.id);
    }

}