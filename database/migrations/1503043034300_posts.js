'use strict'

const Schema = use('Schema')

class PostsTableSchema extends Schema {

  /**
   * up method for create/update
   */
  up() {
    this.create('posts', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.text('content')
    })
  }

  /**
   * down method for drop
   */
  down() {
    this.drop('posts')
  }

}

module.exports = PostsTableSchema
