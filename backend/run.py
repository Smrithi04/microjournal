from flask import Flask, send_from_directory
from app.routes import bp
import os
from app import create_app, db
from flask_cors import CORS

app=create_app()

# Optional: Explicit route (backup)
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(os.path.join(app.root_path, 'static'), filename)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
