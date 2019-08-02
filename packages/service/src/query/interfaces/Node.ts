import { Resolvers } from '../../generated/graphql';
import { decodeId, encodeId } from '../../libs/globalId';

export const nodeInterface: Resolvers = {
  Node: {
    __resolveType(node) {
      return decodeId(node.id).typename as any;
    },
    id(entity: any) {
      return encodeId(entity.constructor.name, entity.id);
    },
  },
};
