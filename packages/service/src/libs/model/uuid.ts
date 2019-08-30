import { createModelPlugin } from './pluggable';
import uuid from 'uuid/v4';

export const UUIDPlugin = createModelPlugin<void>(() => {
  return {
    beforeInsert: async function() {
      this.id = this.id || uuid();
    },
  };
});
