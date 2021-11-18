import { Service, Inject } from 'typedi';
// import {
//     EventDispatcher,
//     EventDispatcherInterface,
// } from '@/decorators/eventDispatcher';
import { RecipeModel } from '@/models';

@Service()
export default class RecipeService {
    constructor(
        @Inject('logger') private logger // private mailer: MailerService,
    ) // @EventDispatcher() private eventDispatcher: EventDispatcherInterface
    {
    }

    async getRecipes(): Promise<any> {
        return await RecipeModel.findAll();
    }
}
