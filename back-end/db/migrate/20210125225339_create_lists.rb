class CreateLists < ActiveRecord::Migration[6.1]
  def change
    create_table :lists do |t|
      t.string :name
      t.references :board, null: false, foreign_key: true

      t.timestamps
    end
  end
end