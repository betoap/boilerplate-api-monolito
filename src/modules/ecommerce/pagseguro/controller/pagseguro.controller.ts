import { SequelizeController } from './../../../../core/controller';

import { PagseguroService } from './../service/pagseguro.service';

export class PagseguroController extends SequelizeController {

    protected service: PagseguroService = new PagseguroService;

}
