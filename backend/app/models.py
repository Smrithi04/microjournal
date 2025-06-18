from . import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    profile_pic = db.Column(db.String(255))

    entries = db.relationship('JournalEntry', backref='author', lazy=True)


class JournalEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    mood = db.Column(db.String(20))
    date_created = db.Column(db.DateTime, default=datetime.utcnow)  # ✅ add this line
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
