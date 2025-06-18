from flask import Blueprint, request, jsonify, url_for
from . import db
from .models import User, JournalEntry
from .utils import hash_password, check_password
from .sentiments import analyze_sentiment
from datetime import datetime, timedelta
import pytz
from pytz import timezone
IST = pytz.timezone('Asia/Kolkata')

bp = Blueprint('api', __name__, url_prefix='/api')

# ------------------- Auth -------------------

@bp.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return '', 200  # ✅ Handle preflight cleanly

    data = request.get_json()
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"message": "Username already exists"}), 409

    user = User(
        username=data['username'],
        password_hash=hash_password(data['password'])
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"})


@bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200  # ✅ Handle preflight cleanly

    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()

    if not user or not check_password(user.password_hash, data['password']):
        return jsonify({"message": "Invalid username or password"}), 401

    return jsonify({"message": "Login successful", "user_id": user.id})


# ------------------- Journal -------------------

@bp.route('/journal', methods=['POST', 'OPTIONS'])
def add_journal():
    if request.method == 'OPTIONS':
        return '', 200
    data = request.get_json()
    mood = analyze_sentiment(data['content'])

    entry = JournalEntry(
        content=data['content'],
        mood=mood,
        user_id=data['user_id']
    )
    db.session.add(entry)
    db.session.commit()
    return jsonify({"message": "Entry added", "mood": mood})

@bp.route('/journal/<int:user_id>', methods=['GET'])
def get_entries(user_id):
    entries = JournalEntry.query.filter_by(user_id=user_id).order_by(JournalEntry.date_created.desc()).all()
    return jsonify([
        {
            "id": e.id,
            "content": e.content,
            "mood": e.mood,
            "date_created": e.date_created.astimezone(IST).strftime("%Y-%m-%d %I:%M %p")
        } for e in entries
    ])

@bp.route('/mood-trend/<int:user_id>', methods=['GET', 'OPTIONS'])
def mood_trend(user_id):
    today = datetime.utcnow
    one_week_ago = today - timedelta(days=7)

    entries = (
        JournalEntry.query
        .filter(JournalEntry.user_id == user_id, JournalEntry.date_created >= one_week_ago)
        .order_by(JournalEntry.date_created.asc())
        .all()
    )

    return jsonify([
        {
            "date": e.date_created.strftime("%Y-%m-%d"),
            "mood": e.mood
        } for e in entries
    ])


@bp.route('/journal/<int:entry_id>', methods=['PUT', 'OPTIONS'])
def update_entry(entry_id):
    if request.method == 'OPTIONS':
        return '', 200
    data = request.get_json()
    entry = JournalEntry.query.get_or_404(entry_id)
    entry.content = data['content']
    db.session.commit()
    return jsonify({"message": "Entry updated!"})


@bp.route('/journal/<int:entry_id>', methods=['DELETE', 'OPTIONS'])
def delete_entry(entry_id):
    entry = JournalEntry.query.get_or_404(entry_id)
    db.session.delete(entry)
    db.session.commit()
    return jsonify({"message": "Entry deleted!"})

@bp.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({
            "id": user.id,
            "username": user.username,
            "profile_pic": user.profile_pic  # no /static or full path!
        })
    return jsonify({"error": "User not found"}), 404

@bp.route('/user/<int:user_id>', methods=['PUT', 'OPTIONS'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    if 'username' in data:
        user.username = data['username']
    if 'profile_pic' in data:
        user.profile_pic = data['profile_pic']

    db.session.commit()
    return jsonify({"message": "User updated successfully!"})
