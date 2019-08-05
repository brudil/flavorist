import { mergeSchemas } from 'graphql-tools';
import { CoreSchema } from './Core';
import { RecipeSchema } from './Recipe';
import { UserSchema } from './User';
import { IngredientSchema } from './Ingredient';
import { DiscussionSchema } from './Discussion';
import { BatchSchema } from './Batch';
import { ReviewSchema } from './Review';

export default mergeSchemas({
  schemas: [
    CoreSchema,
    RecipeSchema,
    UserSchema,
    IngredientSchema,
    ReviewSchema,
    DiscussionSchema,
    BatchSchema,
  ],
});
