from flask import Flask, jsonify, request
from flask_cors import CORS
from databases import Database
from databases import DatabaseURL

app = Flask(__name__)
CORS(app)
db = Database(DatabaseURL('sqlite:///hw2database.db'))

@app.route('/users', methods=['GET'])
async def get_users():
    query = 'SELECT * FROM users'
    rows = await db.fetch_all(query)
    users = []
    for row in rows:
        user = {'id': row[0], 'name': row[1], 'points': row[2]}
        users.append(user)
    return jsonify(users)

@app.route('/users', methods=['POST'])
async def create_user():
    data = request.get_json()
    query = 'INSERT INTO users (name, points) VALUES (:name, :points)'
    await db.execute(query, values={'name': data['name'], 'points': data['points']})
    return '', 204

@app.route('/users/<int:user_id>', methods=['PUT'])
async def update_user(user_id):
    data = request.get_json()
    query = 'UPDATE users SET name = :name, points = :points WHERE id = :id'
    await db.execute(query, values={'name': data['name'], 'points': data['points'], 'id': user_id})
    return '', 204

@app.route('/users/<int:user_id>', methods=['DELETE'])
async def delete_user(user_id):
    query = 'DELETE FROM users WHERE id = :id'
    await db.execute(query, values={'id': user_id})
    return '', 204

