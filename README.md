🌟 TECHX – Full Stack Web Application

A full-stack web application built with Django (Backend) and Next.js (Frontend).

🛠️ Tech Stack
Frontend :
 Next.js  ,                                                                            
 React    ,
 Tailwind CSS  ,
 Axios 
Backend:
 Django  ,
 Django REST Framework ,
 SQLite / PostgreSQL ,
 Python 3.10+ ,

🚀 Setup Instructions
🖥️ Backend Setup (Django)
1️⃣ Install Python

Download from https://www.python.org/

2️⃣ Navigate to backend folder
cd dtechproject

3️⃣ (Optional) Create virtual environment

Windows

python -m venv .venv
.venv\Scripts\activate

4️⃣ Install required libraries
pip install -r requirements.txt

5️⃣ Apply migrations
python manage.py migrate

6️⃣ Run Django server
python manage.py runserver


Backend runs at:

👉 http://127.0.0.1:8000/

🌐 Frontend Setup (Next.js)
1️⃣ Install Node.js

Download from https://nodejs.org/

2️⃣ Navigate to frontend folder
cd next-project

3️⃣ Install dependencies
npm install

4️⃣ Run dev server
npm run dev


Frontend runs at:

👉 http://localhost:3000/

🔑 Environment Variables
Backend (.env)

Create inside dtechproject/:

SECRET_KEY=your_secret_key
DEBUG=True
DB_NAME=
DB_USER=
DB_PASSWORD=

Frontend (.env.local)

Inside next-project/:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/

📡 API Endpoints (Example)
GET   /api/products/
POST  /api/login/
POST  /api/signup/
GET   /api/news/

🤝 Contributing

If someone wants to contribute:
Fork repository
Create a new branch
Make changes
Push

Create Pull Request
Owner reviews & merges


