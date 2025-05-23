from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from db import db  # ✅ import db from separate module
from datetime import timedelta
from dotenv import load_dotenv
import os
import cloudinary
import cloudinary.uploader
import cloudinary.api
import razorpay
from pathlib import Path


# Load environment variables
load_dotenv(dotenv_path=Path('.') / '.env')  # Ensures correct loading of .env

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app,
     origins=["http://localhost:5173"],
     supports_credentials=True,
     expose_headers=["Content-Type", "Authorization"],
     allow_headers=["Content-Type", "Authorization"]
)

# Debug print to verify env variables
print("Razorpay Key ID:", os.getenv('RAZORPAY_KEY_ID'))
print("Razorpay Key Secret:", os.getenv('RAZORPAY_KEY_SECRET'))
print("JWT Secret Key:", os.getenv('JWT_SECRET_KEY'))

# Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-fallback-secret')  # ✅ fallback for dev
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# JWT Cookie Configuration
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']
app.config['JWT_COOKIE_SECURE'] = False  # Set to True in production (HTTPS)
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
app.config['JWT_SESSION_COOKIE'] = False
app.config['JWT_COOKIE_SAMESITE'] = 'Lax'

# Razorpay client setup
razorpay_client = razorpay.Client(
    auth=(
        os.getenv("RAZORPAY_KEY_ID"),
        os.getenv("RAZORPAY_KEY_SECRET")
    )
)

# Cloudinary config
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET'),
    secure=True
)

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)

# Register blueprints
from routes.auth_routes import auth_bp
from routes.product_routes import product_bp
from routes.cart_routes import cart_bp
from routes.order_routes import order_bp

app.register_blueprint(auth_bp)
app.register_blueprint(product_bp)
app.register_blueprint(cart_bp)
app.register_blueprint(order_bp)

# Create DB tables
with app.app_context():
    db.create_all()

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
