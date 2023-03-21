'''
This script will open the library of ICD-10-CM codes and descriptions and turn
them into a list of tuples.
The library can be found here: https://www.cms.gov/Medicare/Coding/ICD10
The list of tuples will be used to populate the ICD-10-CM code and description
for the application.
'''

file_name = 'icd10cm_codes_2023.txt'

ICD_10_CM = []

with open(file_name, 'r') as f:
    lines = f.readlines()
    for line in lines:
        code, description = line.strip().split('\t', maxsplit=1)
        ICD_10_CM.append((code, code + ' - ' + description))

print(ICD_10_CM)
