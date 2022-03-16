from flask import Flask, render_template
from flask_bootstrap5 import Bootstrap

app = Flask(__name__)
bootstrap = Bootstrap(app)


@app.route('/')
def homepage():  # put application's code here
    return render_template('index.html')

@app.route('/actors')
def actors():
    return render_template('actors.html')

@app.route('/movies')
def movies():
    return render_template('movies.html')

if __name__ == '__main__':
    app.run()
