class CreateConsultResults < ActiveRecord::Migration[8.0]
  def change
    create_table :consult_results do |t|
      t.references :consult, null: false, foreign_key: true
      t.integer :specialist_id
      t.text :conclusion
      t.string :diagnoses
      t.text :treatment

      t.timestamps
    end
  end
end
