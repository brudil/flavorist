import slugify from 'slugify';
import uuid from 'uuid/v4';
import { createModelPlugin } from './pluggable';
import { Transaction } from 'objection';

interface SlugifyOptions {
  sourceField: string;
  slugField: string;
  update?: boolean;
  unique: string[];
  slugCandidates: () => Promise<string[][]>;
}

export const SlugPlugin = createModelPlugin<SlugifyOptions>(
  ({ sourceField, slugField, update = false, unique }) => {
    const generateSlug = async (
      transaction: Transaction,
      model: any,
      str: string,
    ) => {
      const slug = slugify(str, { lower: true });

      if (unique) {
        return await findUniqueSlug(transaction, model, slug);
      } else {
        return slug;
      }
    };

    const isSlugUnique = async (
      transaction: Transaction,
      model: any,
      slug: string,
    ) => {
      try {
        const row = await model.constructor
          .query(transaction)
          .where(
            unique.reduce<any>((obj, key) => {
              obj[key] = model[key];
              return obj;
            }, {}),
          )
          .where(slugField, slug)
          .first();

        return !row;
      } catch (err) {
        throw new Error(err.message);
      }
    };

    const findUniqueSlug = async (
      transaction: Transaction,
      model: any,
      original: string,
      current: string | null = null,
    ): Promise<string> => {
      const isUnique = await isSlugUnique(
        transaction,
        model,
        current || original,
      );

      if (!isUnique) {
        return await findUniqueSlug(
          transaction,
          original,
          `${original}-${uuid()}`,
        );
      }

      return current || original;
    };

    return {
      beforeUpdate: async function(modelOptions, queryContext) {
        const { patch, old } = modelOptions;

        if (update) {
          const source = this[sourceField];

          if (source && patch && old && source !== (old as any)[sourceField]) {
            const slug = await generateSlug(
              queryContext.transaction,
              this,
              source,
            );
            this[slugField] = slug;
          }
        }
      },
      beforeInsert: async function(queryContext) {
        const source = this[sourceField];

        if (source) {
          const slug = await generateSlug(
            queryContext.transaction,
            this,
            source,
          );
          this[slugField] = slug;
        }
      },
    };
  },
);
