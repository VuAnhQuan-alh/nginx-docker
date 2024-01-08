import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

export class DatabaseModuleDefinitions {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
