class CreateConsultConversations < ActiveRecord::Migration[8.0]
  def change
    create_table :consult_conversations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :consult, null: false, foreign_key: true
      t.text :message

      t.timestamps
    end
  end
end
