class AddDetailsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :first_name, :string
    add_column :users, :middle_name, :string
    add_column :users, :last_name, :string
    add_column :users, :suffix, :string
    add_column :users, :phone_number, :string
    add_column :users, :phone_type, :string
    add_column :users, :role, :integer
    add_reference :users, :practice, null: false, foreign_key: true
  end
end
