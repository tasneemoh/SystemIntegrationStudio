import { Module } from '@nestjs/common';
import { ExecutorService } from './executor.service';
import { ExecutorController } from './executor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkFlow, WorkFlowSchema } from 'src/Schemas/WorkFlow.schema';
import { ApiStepHandler } from './Handlers/ApiStepHandler';
import { TransformStepHandler } from './Handlers/TransformStepHandler';

@Module({
  imports: [MongooseModule.forFeature(
              [{name : WorkFlow.name,
                  schema : WorkFlowSchema
              }]
          )],
  providers: [ExecutorService, ApiStepHandler, TransformStepHandler],
  controllers: [ExecutorController]
})
export class ExecutorModule {}
