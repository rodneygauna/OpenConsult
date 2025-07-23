class CreatePractices < ActiveRecord::Migration[8.0]
  def change
    create_table :practices do |t|
      t.string :name
      t.string :address
      t.string :suite
      t.string :po_box
      t.string :city
      t.string :state
      t.string :zip
      t.string :phone_number
      t.string :fax_number
      t.string :email

      t.timestamps
    end
  end
end
