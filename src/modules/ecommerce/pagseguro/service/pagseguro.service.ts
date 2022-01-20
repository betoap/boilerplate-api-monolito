import { SequelizeService } from './../../../../core/service';
import { PagSeguroService } from './../../../../core/service/pagseguro.service';

import { PagseguroFilter } from './../filter/pagseguro.filter';
import { PagseguroRepository } from './../repository/pagseguro.repository';
import PagseguroEntity from './../entity/pagseguro.entity';

export class PagseguroService extends SequelizeService {

    public filter: PagseguroFilter = new PagseguroFilter;
    protected repository: PagseguroRepository = new PagseguroRepository;
    protected entity = PagseguroEntity;

    create( data ): Promise<any> {
      return new Promise( async (resolve, reject ) => {
        try {
          const ps = new PagSeguroService();
          ps.addItem( data );
          const resp = await ps.send();
          return resolve( resp );
        } catch (error) {
          return reject( error );
        }
      });
  }

}
