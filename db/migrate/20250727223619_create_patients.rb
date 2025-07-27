class CreatePatients < ActiveRecord::Migration[8.0]
  def change
    create_table :patients do |t|
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.string :suffix
      t.date :date_of_birth
      t.string :mobile_number
      t.string :home_number
      t.string :work_number
      t.string :email
      t.string :address
      t.string :apartment_number
      t.string :po_box
      t.string :city
      t.string :state
      t.string :zip
      t.string :sex
      t.string :gender_identity
      t.string :sexual_orientation
      t.references :practice, null: false, foreign_key: true

      t.timestamps
    end
  end
end
