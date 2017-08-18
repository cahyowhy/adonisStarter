'use strict'

const Schema = use('Schema')

class AddColumnTableSchema extends Schema {

  up() {
    this.table('comments', (table) => {
      // alter add_column table
      table.integer('post_id').unsigned().references('id').inTable('posts')
    })
  }
}

module.exports = AddColumnTableSchema
