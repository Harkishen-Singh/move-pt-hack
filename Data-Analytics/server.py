from flask import Flask,request, render_template, url_for, jsonify
import os, csv
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

port = int(os.environ.get("PORT", 5500))


@app.route('/')
def works():
    return 'Recommendation engine working'

@app.route('/getRecommendation', methods=['GET','POST'])
def recomm():
    
    if request.method == 'POST' :
        file = open('date_details.csv', 'r')
        f = csv.reader(file)
        sourceCode = request.form['srccode']
        destCode = request.form['destcode']
        for i in f :
            if sourceCode == i[0] and destCode == i[1] :
                print('here')
                print(sourceCode + ' ' + destCode)
                print('expected days : '+ str(i[2]))
                obj = {
                    'hours': i[2],
                }
                # obj.hours = i[2]
                file.close()
                return jsonify(i[2])
    return jsonify('N/A')
        
    
    

if __name__ == '__main__' :
    app.debug=True
    app.run(host = '0.0.0.0', port=port)