import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { db_funcs_array } from './db_funcs';
import { db_triggers_array } from './db_triggers';
import { db_views_array } from './db_views';

@Injectable()
export class DbSeederService {
  constructor(private manager: EntityManager) { }
  private readonly logger = new Logger(`DB Seeding Service`);

  async onModuleInit() {
    for await (const func of db_funcs_array) {
      await this.manager.query(func());
    }
    for await (const view of db_views_array) {
      await this.manager.query(view());
    }

    for await (const trigger of db_triggers_array) {
      await this.manager.query(trigger());
    }



    this.logger.log('Functions, Trigger, Views added to database successfully');
  }
}
