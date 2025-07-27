class CreateConsults < ActiveRecord::Migration[8.0]
  def change
    create_table :consults do |t|
      t.integer :status
      t.integer :priority
      t.string :specialty
      t.text :chief_complaint
      t.text :comments_to_specialist
      t.text :main_question
      t.references :patient, null: false, foreign_key: true
      t.references :practice, null: false, foreign_key: true
      t.integer :provider_id
      t.integer :specialist_id

      t.timestamps
    end
  end
end
