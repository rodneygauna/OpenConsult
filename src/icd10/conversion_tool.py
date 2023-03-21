'''
This script will open the library of ICD-10-CM codes and descriptions and turn
them into a list of tuples. A Python file will be created with the list of
ICD 10 CM codes and descriptions.

The library can be found here: https://www.cms.gov/Medicare/Coding/ICD10

The list of tuples will be used to populate the ICD-10-CM code and description
for the application.
'''


# Imports
import os
import re

# Path to the file
file_path = os.path.join(os.path.dirname(__file__), 'icd10cm_codes_2023.txt')

ICD_10_CM = []

with open(file_path, 'r') as f:
    lines = f.readlines()
    for line in lines:
        values = re.split(r'\s+', line.strip(), maxsplit=1)
        if len(values) == 2:
            code, description = values
            if len(code) > 3:
                code = code[:3] + '.' + code[3:]
            description = description.strip()  # remove any leading/trailing whitespace
            ICD_10_CM.append((code, code + ' - ' + description))

# Write the ICD-10-CM codes and descriptions to a Python file
output_file_path = os.path.join(os.path.dirname(__file__), 'dictionaries.py')
with open(output_file_path, 'w') as f:
    f.write('ICD_10_CM = [\n')
    for i, (code, description) in enumerate(ICD_10_CM):
        if i == len(ICD_10_CM) - 1:
            f.write(f'  ("{code}", "{description}")\n')
        else:
            f.write(f'  ("{code}", "{description}"),\n')
    f.write(']\n')

print(
    f'Generated {output_file_path} with {len(ICD_10_CM)} ICD-10-CM codes and descriptions.')
