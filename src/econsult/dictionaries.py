'''
Dictionaries for the econsult portion of the app.
'''


# eConsult status dictionary
CONSULT_STATUS = [
    # Draft - not yet submitted for review
    ('DRAFT', 'Draft'),
    # New - submitted for review
    ('READY FOR REVIEW', 'Ready for Review'),
    # Specialist assigned and actively reviewing
    ('IN REVIEW WITH SPECIALIST', 'In Review with Specialist'),
    # Specialist has completed review and ready for provider to review
    ('TREATMENT OPTIONS AVAILABLE', 'Treatment Options Available'),
    ('ADDITIONAL INFORMATION NEEDED', 'Additional Information Needed'),
    ('DIFFERENT SPECIALIST RECOMMENDED', 'Different Specialist Recommended'),
    ('IN PERSON VISIT RECOMMENDED', 'In Person Visit Recommended'),
    # Provider has reviewed and accepted the recommendation
    ('CLOSED', 'Closed')
]
