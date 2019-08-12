import { mergeSchemas } from 'graphql-tools';
import { CoreSchema } from './Core';
import { RecipeSchema } from './Recipe';
import { UserSchema } from './User';
import { IngredientSchema } from './Ingredient';
import { DiscussionSchema } from './Discussion';
import { BatchSchema } from './Batch';
import { ReviewSchema } from './Review';
import { TeamSchema } from './Team';
import { NamespaceSchema } from './Namespace';

export default mergeSchemas({
  schemas: [
    CoreSchema,
    RecipeSchema,
    UserSchema,
    TeamSchema,
    NamespaceSchema,
    IngredientSchema,
    ReviewSchema,
    DiscussionSchema,
    BatchSchema,
  ],
});
