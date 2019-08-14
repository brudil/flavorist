import { Resolvers } from '../../generated/graphql';
import { createDebuggie } from '../../libs/debuggie';
const log = createDebuggie('resolvers:node');

export const nodeInterface: Resolvers = {
  Node: {
    __resolveType(node) {
      log.debug(node);
      throw new Error('time to implement resolve type');
    },
    id(entity: any) {
      return entity.id;
    },
  },
};
