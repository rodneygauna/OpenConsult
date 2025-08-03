json.extract! patient, :id, :first_name, :middle_name, :last_name, :suffix, :date_of_birth, :mobile_number, :home_number, :work_number, :email, :address, :apartment_number, :po_box, :city, :state, :zip, :sex, :gender_identity, :sexual_orientation, :practice_id, :created_at, :updated_at
json.url patient_url(patient, format: :json)
