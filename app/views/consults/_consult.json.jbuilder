json.extract! consult, :id, :status, :priority, :specialty, :chief_complaint, :comments_to_specialist, :main_question, :patient_id, :practice_id, :provider_id, :specialist_id, :created_at, :updated_at
json.url consult_url(consult, format: :json)
