class ChangeConsultStatusToString < ActiveRecord::Migration[8.0]
  def up
    # First, convert existing integer values to their string equivalents
    # Map old integer values to new string values
    status_mapping = {
      0 => "draft",
      1 => "ready_for_review",
      2 => "in_review_with_specialist",
      3 => "treatment_options_available",
      4 => "additional_information_needed",
      5 => "different_specialty_recommended",
      6 => "in_person_visit_recommended",
      7 => "canceled",
      8 => "closed"
    }

    # Add a temporary column
    add_column :consults, :status_string, :string

    # Convert existing data
    Consult.reset_column_information
    Consult.find_each do |consult|
      if consult.status.present?
        old_status = consult.read_attribute_before_type_cast('status')
        new_status = status_mapping[old_status] || "draft"
        consult.update_column(:status_string, new_status)
      end
    end

    # Remove old column and rename new one
    remove_column :consults, :status
    rename_column :consults, :status_string, :status
  end

  def down
    # Reverse the process
    status_mapping = {
      "draft" => 0,
      "ready_for_review" => 1,
      "in_review_with_specialist" => 2,
      "treatment_options_available" => 3,
      "additional_information_needed" => 4,
      "different_specialty_recommended" => 5,
      "in_person_visit_recommended" => 6,
      "canceled" => 7,
      "closed" => 8
    }

    add_column :consults, :status_integer, :integer

    Consult.reset_column_information
    Consult.find_each do |consult|
      if consult.status.present?
        old_status = consult.status
        new_status = status_mapping[old_status] || 0
        consult.update_column(:status_integer, new_status)
      end
    end

    remove_column :consults, :status
    rename_column :consults, :status_integer, :status
  end
end
