import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemModule } from './System/System.module';
import { IntegrationModule } from './Integration/Integration.module';
import { WorkFlowModule } from './WorkFlow/WorkFlow.module';
import { EnvironmentModule } from './Environment/Environment.module';
import { ExecutorModule } from './executor/executor.module';
import { EndPointModule } from './EndPoint/EndPoint.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/TasneemFirstIntegrationStudio'),
    SystemModule,
    IntegrationModule,
    WorkFlowModule,
    EnvironmentModule,
    ExecutorModule,
    EndPointModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
