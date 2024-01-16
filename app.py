import os
import subprocess
from flask import Flask, request , jsonify
# from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://your-frontend-domain.com"}})

stockfish_path = os.path.join("stockfish","stockfish-windows-x86-64")
stockfish_process = subprocess.Popen(stockfish_path, universal_newlines = True, stdin = subprocess.PIPE, stdout = subprocess.PIPE)

@app.route('/')
def initialize():
#   stockfish_path = os.path.join("stockfish","stockfish-windows-x86-64")
#   stockfish_process = subprocess.Popen(stockfish_path, universal_newlines = True, stdin = subprocess.PIPE, stdout = subprocess.PIPE)
  stockfish_process.stdin.write('uci\n')
  stockfish_process.stdin.flush()
  print(stockfish_process.stdout.read)
  return "APP start"
  
@app.route('/stockfish-api', methods = ['POST'])
def nextMove():
  data = request.json['move']
  stockfish_process.stdin.write('position startpos moves' + data+'\n')
  stockfish_process.stdin.flush()
  stockfish_process.stdin.write('go movetime 2000\n')
  stockfish_process.stdin.flush()
  
  next = None
  while True:
    line = stockfish_process.stdout.readline().strip()
    print("Stockfish Output:", line)
    if line.startswith("bestmove"):
      next = line.split()[1]
      break
  return jsonify({'nextMove' : next})
  
if __name__ == '__main__':
  app.run(debug=True)
  
  
  
