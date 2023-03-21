'''
Database models for the consults portion of the application.
'''


# Imports
from datetime import datetime
from src import db


# Consult model
class Consult(db.Model):
    '''Consult model'''

    __tablename__ = 'consults'

    # IDs
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))
    creating_provider_id = db.Column(db.Integer, db.ForeignKey('providers.id'))
    assigned_specialist_id = db.Column(
        db.Integer, db.ForeignKey('providers.id'))
    # Timestamps
    created_date = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    updated_date = db.Column(db.DateTime, default=datetime.utcnow)
    updated_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    # Status
    status = db.Column(db.String(50), default='DRAFT')
    # Consult Information
    specialty = db.Column(db.String(255), nullable=False)
    chief_complaint = db.Column(db.Text, nullable=False)
    comments_to_specialist = db.Column(db.Text)
    main_question = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"Consult ID: {self.id}"
