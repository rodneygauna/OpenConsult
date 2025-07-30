class ChangeUserRoleToString < ActiveRecord::Migration[8.0]
  def up
    # First, convert existing integer values to their string equivalents
    # Map old integer values to new string values
    role_mapping = {
      0 => "user",
      1 => "super_user",
      2 => "admin"
    }

    # Add a temporary column
    add_column :users, :role_string, :string

    # Convert existing data
    User.reset_column_information
    User.find_each do |user|
      if user.role.present?
        old_role = user.read_attribute_before_type_cast('role')
        new_role = role_mapping[old_role] || "user"
        user.update_column(:role_string, new_role)
      end
    end

    # Remove old column and rename new one
    remove_column :users, :role
    rename_column :users, :role_string, :role
  end

  def down
    # Reverse the process
    role_mapping = {
      "user" => 0,
      "super_user" => 1,
      "admin" => 2
    }

    add_column :users, :role_integer, :integer

    User.reset_column_information
    User.find_each do |user|
      if user.role.present?
        old_role = user.role
        new_role = role_mapping[old_role] || 0
        user.update_column(:role_integer, new_role)
      end
    end

    remove_column :users, :role
    rename_column :users, :role_integer, :role
  end
end
