json.extract! consult_result, :id, :consult_id, :specialist_id, :conclusion, :diagnoses, :treatment, :created_at, :updated_at
json.url consult_result_url(consult_result, format: :json)
