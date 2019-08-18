import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema
    .createTable('namespace', (table) => {
      table.uuid('id').primary();
      table
        .text('type')
        .notNullable()
        .index();
      table
        .text('name')
        .unique()
        .notNullable()
        .index();
      table.timestamps();
    })
    .createTable('user', (table) => {
      table.uuid('id').primary();
      table
        .uuid('namespace_id')
        .references('namespace.id')
        .unique()
        .index();
      table
        .text('display_name')
        .notNullable()
        .defaultTo('');
      table.text('password_hash').notNullable();
    })
    .createTable('user_email_address', (table) => {
      table.uuid('id').primary();
      table.uuid('user_id').references('user.id');
      table
        .text('email_address')
        .notNullable()
        .unique()
        .index();
      table.text('status').notNullable();
      table.timestamps();
    })
    .alterTable('user', (table) => {
      table
        .uuid('primary_email_address_id')
        .references('user_email_address.id');
    })
    .createTable('vendor', (table) => {
      table.uuid('id').primary();
      table.text('name').notNullable();
      table
        .text('short_name')
        .unique()
        .index();
    })
    .createTable('team', (table) => {
      table.uuid('id').primary();
      table
        .uuid('namespace_id')
        .references('namespace.id')
        .unique()
        .index();
    })
    .createTable('team_membership', (table) => {
      table.uuid('id').primary();
      table.uuid('team_id').references('team.id');
      table.uuid('user_id').references('user.id');
      table.text('role').notNullable();
      table.unique(['team_id', 'user_id']);
    })
    .createTable('ingredient', (table) => {
      table.uuid('id').primary();
      table
        .uuid('vendor_id')
        .references('vendor.id')
        .notNullable();

      table.text('name').notNullable();
      table.text('type').notNullable();
      table.timestamps();
    })
    .createTable('inventory_item', (table) => {
      table.uuid('id').primary();
      table
        .uuid('ingredient_id')
        .references('ingredient.id')
        .notNullable();
      table
        .uuid('namespace_id')
        .references('namespace.id')
        .notNullable();

      table
        .integer('current_level_microlitres')
        .defaultTo(0)
        .notNullable();
      table
        .integer('current_level_cost')
        .defaultTo(0)
        .notNullable();
      table.timestamps();
    })
    .createTable('recipe', (table) => {
      table.uuid('id').primary();
      table
        .uuid('namespace_id')
        .references('namespace.id')
        .notNullable();
      table
        .uuid('created_by_id')
        .references('user.id')
        .notNullable();

      table
        .integer('total_revisions')
        .defaultTo(0)
        .notNullable();
      table
        .text('secret_key')
        .index()
        .nullable()
        .unique();
      table.timestamps();
    })
    .createTable('recipe_revision', (table) => {
      table.uuid('id').primary();
      table
        .uuid('recipe_id')
        .references('recipe.id')
        .notNullable();
      table
        .uuid('created_by_id')
        .references('user.id')
        .notNullable();

      table.text('name').notNullable();
      table.integer('revision_number').notNullable();
      table.integer('suggested_steep_hours').nullable();
      table.float('suggested_vg').nullable();
      table.boolean('shake_and_vapable').notNullable();
      table.timestamps();
    })
    .alterTable('recipe', (table) => {
      table
        .uuid('remix_of_id')
        .references('recipe.id')
        .nullable();
      table
        .uuid('latest_revision_id')
        .references('recipe_revision.id')
        .nullable();
    })
    .createTable('recipe_ingredient_use', (table) => {
      table.uuid('id').primary();
      table
        .uuid('ingredient_id')
        .references('ingredient.id')
        .notNullable();
      table
        .uuid('recipe_revision_id')
        .references('recipe_revision.id')
        .notNullable();
      table.float('percentage');
      table.text('notes');

      table.unique(['recipe_revision_id', 'ingredient_id']);
    })
    .createTable('batch', (table) => {
      table.uuid('id').primary();
      table
        .integer('volume')
        .defaultTo(0)
        .notNullable();
      table
        .uuid('recipe_revision_id')
        .references('recipe_revision.id')
        .notNullable();
      table
        .uuid('namespace_id')
        .references('namespace.id')
        .notNullable();
      table
        .uuid('user_id')
        .references('user.id')
        .notNullable();
      table.timestamps();
    })
    .createTable('batch_ingredient_use', (table) => {
      table.uuid('id').primary();
      table.integer('volume');
      table
        .uuid('ingredient_id')
        .references('ingredient.id')
        .notNullable();
      table
        .uuid('batch_id')
        .references('batch.id')
        .notNullable();
    });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema
    .dropTableIfExists('user')
    .dropTableIfExists('batch')
    .dropTableIfExists('batch_ingredient_use')
    .dropTableIfExists('discussion')
    .dropTableIfExists('discussion_comment')
    .dropTableIfExists('follower')
    .dropTableIfExists('ingredient')
    .dropTableIfExists('ingredient_ledger_entry')
    .dropTableIfExists('inventory_item')
    .dropTableIfExists('namespace')
    .dropTableIfExists('recipe')
    .dropTableIfExists('recipe_ingredient_use')
    .dropTableIfExists('recipe_revision')
    .dropTableIfExists('team')
    .dropTableIfExists('team_membership')
    .dropTableIfExists('user')
    .dropTableIfExists('user_email_address')
    .dropTableIfExists('vendor');
}
