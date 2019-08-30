import { Model, Validator, ValidatorArgs } from 'objection';
import { validateSync } from 'class-validator';
import { UUIDPlugin } from '../libs/model/uuid';

type ClassValidatorArgs = { model: BaseModel } & ValidatorArgs;
export type ID = string;
class ClassValidator extends Validator {
  validate({ model, json, options }: ClassValidatorArgs) {
    validateSync(model, { skipMissingProperties: options.patch });
    return json;
  }
}

@UUIDPlugin()
export class BaseModel extends Model {
  static get idColumn() {
    return 'id';
  }

  static createValidator() {
    return new ClassValidator();
  }

  id: ID;
}
