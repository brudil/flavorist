import { Model, Validator, ValidatorArgs } from 'objection';
import { validateSync } from 'class-validator';
import uuid from 'uuid/v4';

type ClassValidatorArgs = { model: BaseModel } & ValidatorArgs;
export type ID = string;
class ClassValidator extends Validator {
  validate({ model, json, options }: ClassValidatorArgs) {
    validateSync(model, { skipMissingProperties: options.patch });
    return json;
  }
}

export class BaseModel extends Model {
  static get idColumn() {
    return 'id';
  }

  static createValidator() {
    return new ClassValidator();
  }

  id: ID;

  $beforeInsert(context: any) {
    const parent = super.$beforeInsert(context);

    return Promise.resolve(parent)
      .then(() => this.id || uuid())
      .then((guid) => {
        this.id = guid;
      });
  }
}
