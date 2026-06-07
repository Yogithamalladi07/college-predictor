from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load dataset
df = pd.read_csv("Josaa_2025.csv", sep="\t")

df['Closing Rank'] = pd.to_numeric(
    df['Closing Rank'],
    errors='coerce'
)

df['Opening Rank'] = pd.to_numeric(
    df['Opening Rank'],
    errors='coerce'
)


df = df.dropna(subset=['Closing Rank'])

@app.route('/')
def home():
    return "College Predictor API Running!"


@app.route('/predict', methods=['POST'])
def predict():

    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No data provided"}), 400

    try:
        student_rank = int(data.get('rank'))
    except ValueError:
        return jsonify({"error": "Invalid rank"}), 400

    category = data.get('category', '').upper()
    gender = data.get('gender', '')
    branch = data.get('branch', '')
    exam = data.get('exam', '')
    
    print("Exam:", exam)
    print("Category:", category)
    print("Gender:", gender)
    print("Branch:", branch)
    print("Rank:", student_rank)
        
    filtered = df[
        (df['Seat Type'].str.upper() == category) &
        (df['Gender'] == gender) &
        (df['Closing Rank'] >= student_rank) 
    ]        

    print("After rank/category/gender filter:", len(filtered))
    
    if exam == "JEE ADV":
        print(
            df[df['Institute'].str.contains(
                "Indian Institute of Technology",
                case=False,
                na=False
            )]['Institute'].head()
        )
        

    elif exam == "JEE MAIN":
        filtered = filtered[
            filtered['Institute'].str.contains(
                "National Institute of Technology",
                case=False,
                na=False
            )
        ]
    if branch:
        filtered = filtered[
            filtered['Academic Program Name']
            .str.contains(branch, case=False, na=False)
        ]

    filtered = filtered.sort_values(by='Closing Rank')

    if filtered.empty:
        return jsonify({
            "message": "No colleges found"
        })

    result = filtered[
        [
            'Institute',
            'Academic Program Name',
            'Seat Type',
            'Gender',
            'Opening Rank',
            'Closing Rank'
        ]
    ].head(20)

    return jsonify(result.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)