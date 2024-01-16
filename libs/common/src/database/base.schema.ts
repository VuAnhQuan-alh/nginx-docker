import _ from 'lodash';
import * as mongoose from 'mongoose';

import { TypeMetadataStorage } from '@nestjs/mongoose/dist/storages/type-metadata.storage';

export type SchemaOptions = mongoose.SchemaOptions & {
  inheritOption?: boolean;
};

function mergeOptions(
  parentOptions: SchemaOptions,
  childOptions: SchemaOptions,
) {
  for (const key in childOptions) {
    if (Object.prototype.hasOwnProperty.call(childOptions, key)) {
      parentOptions[key] = childOptions[key];
    }
  }
  return parentOptions;
}

export function BaseSchema(options?: SchemaOptions): ClassDecorator {
  return (target: Function) => {
    const isInheritOptions = options.inheritOption;

    if (isInheritOptions) {
      let parentOptions = TypeMetadataStorage.getSchemaMetadataByTarget(
        (target as any).__proto__,
      ).options;
      parentOptions = _.cloneDeep(parentOptions);
      options = mergeOptions(parentOptions, options);
    }

    TypeMetadataStorage.addSchemaMetadata({
      target,
      options,
    });
  };
}
