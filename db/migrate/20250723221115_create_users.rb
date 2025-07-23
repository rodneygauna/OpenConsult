class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.string :suffix
      t.string :phone_number
      t.string :phone_type
      t.string :email
      t.integer :role
      t.references :practice, null: false, foreign_key: true

      t.timestamps
    end
  end
end
