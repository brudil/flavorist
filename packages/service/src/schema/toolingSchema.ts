import { mergeSchemas } from 'graphql-tools';
import { CoreSchema } from './Core';
import { RecipeSchema } from './Recipe';
import { UserSchema } from './User';
import { FlavorSchema } from './Flavor';
import { DiscussionSchema } from './Discussion';
import { BatchSchema } from './Batch';
import { ReviewSchema } from './Review';

export default mergeSchemas({
  schemas: [
    CoreSchema,
    RecipeSchema,
    UserSchema,
    FlavorSchema,
    ReviewSchema,
    DiscussionSchema,
    BatchSchema,
  ],
});
