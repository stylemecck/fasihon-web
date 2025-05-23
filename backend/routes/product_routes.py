# from flask import Blueprint, request, jsonify 
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from db import db
# from models import Product, User
# import cloudinary
# from decorators.roles import admin_required  
# from cloudinary.uploader import upload, destroy
# from cloudinary.exceptions import Error as CloudinaryError
# from decimal import Decimal, InvalidOperation
# from sqlalchemy.exc import SQLAlchemyError
# import random
# from werkzeug.utils import secure_filename

# product_bp = Blueprint('product', __name__)

# # Constants
# ALLOWED_GENDERS = ['men', 'women', 'unisex']
# ALLOWED_CATEGORIES = ['shoes', 'clothing', 'accessories']  # Add your actual categories
# MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

# def validate_product_data(data, require_image=True):
#     """Validate product input data"""
#     errors = []
    
#     required_fields = {
#         'title': str,
#         'description': str,
#         'price': (Decimal, float, int),
#         'gender': str,
#         'category': str
#     }
    
#     # Check required fields
#     for field, types in required_fields.items():
#         if field not in data or not data.get(field):
#             errors.append(f"Missing required field: {field}")
#         elif not isinstance(data[field], types):
#             errors.append(f"Invalid type for {field}")
    
#     # Validate gender
#     if 'gender' in data and data['gender'].lower() not in ALLOWED_GENDERS:
#         errors.append(f"Invalid gender. Allowed values: {', '.join(ALLOWED_GENDERS)}")
    
#     # Validate category
#     if 'category' in data and data['category'].lower() not in ALLOWED_CATEGORIES:
#         errors.append(f"Invalid category. Allowed values: {', '.join(ALLOWED_CATEGORIES)}")
    
#     # Validate price
#     if 'price' in data:
#         try:
#             price = Decimal(str(data['price']))
#             if price <= 0:
#                 errors.append("Price must be positive")
#         except (InvalidOperation, ValueError):
#             errors.append("Invalid price format")
    
#     # Validate image if required
#     if require_image and ('image' not in request.files or not request.files['image']):
#         errors.append("Image file is required")
    
#     return errors

# def handle_image_upload(image_file):
#     """Handle image upload to Cloudinary with validation"""
#     if not image_file:
#         return None, ["No image file provided"]
    
#     if image_file.content_length > MAX_FILE_SIZE:
#         return None, ["Image file too large (max 5MB)"]
    
#     try:
#         # Secure filename and upload
#         filename = secure_filename(image_file.filename)
#         cloudinary_response = upload(image_file, public_id=f"products/{filename.split('.')[0]}")
#         return cloudinary_response.get('secure_url'), None
#     except CloudinaryError as e:
#         return None, [f"Image upload failed: {str(e)}"]

# # Get all products (shuffled for customers)
# @product_bp.route('/api/v1/products', methods=['GET'])
# def get_products():
#     try:
#         # Check if admin (to show all fields)
#         is_admin = False
#         try:
#             user_id = get_jwt_identity()
#             user = User.query.get(user_id)
#             is_admin = user and user.role == 'admin'
#         except:
#             pass
        
#         products = Product.query.all()
        
#         if not products:
#             return jsonify({"message": "No products found"}), 404
        
#         # Shuffle for non-admin users
#         if not is_admin:
#             random.shuffle(products)
        
#         result = [product.to_dict(include_admin_fields=is_admin) for product in products]
#         return jsonify({
#             "success": True,
#             "count": len(result),
#             "products": result
#         }), 200
#     except Exception as e:
#         return jsonify({"success": False, "error": f"Error fetching products: {str(e)}"}), 500

# # Get single product
# @product_bp.route('/api/v1/products/<int:product_id>', methods=['GET'])
# def get_product(product_id):
#     try:
#         product = Product.query.get_or_404(product_id)
        
#         # Check if admin (to show all fields)
#         is_admin = False
#         try:
#             user_id = get_jwt_identity()
#             user = User.query.get(user_id)
#             is_admin = user and user.role == 'admin'
#         except:
#             pass
        
#         return jsonify({
#             "success": True,
#             "product": product.to_dict(include_admin_fields=is_admin)
#         }), 200
#     except SQLAlchemyError:
#         return jsonify({"success": False, "error": "Database error"}), 500
#     except Exception as e:
#         return jsonify({"success": False, "error": str(e)}), 500

# # Create product (Admin only)
# @product_bp.route('/api/v1/products', methods=['POST'])
# @jwt_required()
# @admin_required
# def create_product():
#     try:
#         data = request.form
#         errors = validate_product_data(data)
        
#         if errors:
#             return jsonify({"success": False, "errors": errors}), 400
        
#         # Handle image upload
#         image_url, upload_errors = handle_image_upload(request.files.get('image'))
#         if upload_errors:
#             return jsonify({"success": False, "errors": upload_errors}), 400
        
#         # Create product
#         new_product = Product(
#             title=data['title'],
#             description=data['description'],
#             price=Decimal(str(data['price'])),
#             gender=data['gender'].lower(),
#             category=data['category'].lower(),
#             image=image_url,
#             user_id=get_jwt_identity()
#         )
        
#         db.session.add(new_product)
#         db.session.commit()
        
#         return jsonify({
#             "success": True,
#             "message": "Product created successfully",
#             "product": new_product.to_dict()
#         }), 201
        
#     except Exception as e:
#         db.session.rollback()
#         # Clean up uploaded image if creation failed
#         if 'image_url' in locals():
#             try:
#                 public_id = image_url.split('/')[-1].split('.')[0]
#                 destroy(public_id)
#             except:
#                 pass
#         return jsonify({"success": False, "error": str(e)}), 500

# # Update product (Admin only)
# @product_bp.route('/api/v1/products/<int:product_id>', methods=['PUT'])
# @jwt_required()
# @admin_required
# def update_product(product_id):
#     try:
#         product = Product.query.get_or_404(product_id)
#         data = request.form
        
#         errors = validate_product_data(data, require_image=False)
#         if errors:
#             return jsonify({"success": False, "errors": errors}), 400
        
#         # Update fields
#         product.title = data['title']
#         product.description = data['description']
#         product.price = Decimal(str(data['price']))
#         product.gender = data['gender'].lower()
#         product.category = data['category'].lower()
        
#         # Handle image update if provided
#         if 'image' in request.files and request.files['image']:
#             new_image_url, upload_errors = handle_image_upload(request.files['image'])
#             if upload_errors:
#                 return jsonify({"success": False, "errors": upload_errors}), 400
            
#             # Delete old image if it exists
#             if product.image and product.image != 'default.png':
#                 try:
#                     old_public_id = product.image.split('/')[-1].split('.')[0]
#                     destroy(old_public_id)
#                 except:
#                     pass
            
#             product.image = new_image_url
        
#         db.session.commit()
        
#         return jsonify({
#             "success": True,
#             "message": "Product updated successfully",
#             "product": product.to_dict()
#         }), 200
        
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"success": False, "error": str(e)}), 500

# # Delete product (Admin only)
# @product_bp.route('/api/v1/products/<int:product_id>', methods=['DELETE'])
# @jwt_required()
# @admin_required
# def delete_product(product_id):
#     try:
#         product = Product.query.get_or_404(product_id)
        
#         # Delete image from Cloudinary
#         if product.image and product.image != 'default.png':
#             try:
#                 public_id = product.image.split('/')[-1].split('.')[0]
#                 destroy(public_id)
#             except:
#                 pass
        
#         db.session.delete(product)
#         db.session.commit()
        
#         return jsonify({
#             "success": True,
#             "message": "Product deleted successfully"
#         }), 200
        
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"success": False, "error": str(e)}), 500

# # Get suggested products
# @product_bp.route('/api/v1/products/suggestions', methods=['GET'])
# def get_suggested_products():
#     try:
#         gender = request.args.get('gender', '').lower()
        
#         if not gender or gender not in ALLOWED_GENDERS:
#             return jsonify({
#                 "success": False,
#                 "error": f"Valid gender parameter required. Options: {', '.join(ALLOWED_GENDERS)}"
#             }), 400
        
#         products = Product.query.filter_by(gender=gender).limit(10).all()
        
#         return jsonify({
#             "success": True,
#             "count": len(products),
#             "products": [product.to_dict() for product in products]
#         }), 200
        
#     except Exception as e:
#         return jsonify({"success": False, "error": str(e)}), 500

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import db
from models import Product, User
import cloudinary
from cloudinary.uploader import upload, destroy
from cloudinary.exceptions import Error as CloudinaryError
from decorators.roles import admin_required
from decimal import Decimal
from sqlalchemy.exc import SQLAlchemyError
import random

product_bp = Blueprint('product', __name__)

# Get all products for customer in shuffle order
@product_bp.route('/products/shuffle', methods=['GET'])
def get_all_products_shuffle():
    try:
        products = Product.query.all()
        if not products:
            return jsonify({"message": "No products found"}), 404
        random.shuffle(products)
        result = [product.to_dict() for product in products]
        return jsonify({
            "message": f"Found {len(result)} products",
            "products": result
        }), 200
    except Exception as e:
        return jsonify({"error": f"Error fetching products: {str(e)}"}), 500

# Get all products for admin
@product_bp.route('/products', methods=['GET'])
@admin_required
def get_all_products():
    try:
        products = Product.query.all()
        if not products:
            return jsonify({"message": "No products found"}), 404
        result = [product.to_dict() for product in products]
        return jsonify({
            "message": f"Found {len(result)} products",
            "products": result
        }), 200
    except Exception as e:
        return jsonify({"error": f"Error fetching products: {str(e)}"}), 500

# Get all products for customer
@product_bp.route('/customerProducts', methods=['GET'])
def get_all_products_customer():
    try:
        products = Product.query.all()
        if not products:
            return jsonify({"message": "No products found"}), 404
        result = [product.to_dict() for product in products]
        return jsonify({
            "message": f"Found {len(result)} products",
            "products": result
        }), 200
    except Exception as e:
        return jsonify({"error": f"Error fetching products: {str(e)}"}), 500

# Get a specific product
@product_bp.route('/products/<int:product_id>', methods=['GET'])
@admin_required
def get_product(product_id):
    try:
        product = Product.query.options(db.joinedload(Product.user)).get(product_id)
        if not product:
            return jsonify({"error": "Product not found"}), 404
        product_data = product.to_dict()
        product_data['user'] = product.user.to_dict() if product.user else None
        return jsonify(product_data), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

# Create a product
@product_bp.route('/products', methods=['POST'])
@admin_required
def create_product():
    try:
        data = request.form
        required_fields = ['title', 'description', 'price', 'gender', 'category']
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f'Missing required field: {field}'}), 400

        title = data.get('title')
        description = data.get('description')
        price = Decimal(data.get('price'))
        gender = data.get('gender')
        category = data.get('category')

        if 'image' not in request.files or not request.files['image']:
            return jsonify({"error": "Image file is required"}), 400

        image_file = request.files['image']
        cloudinary_response = upload(image_file)
        image_url = cloudinary_response.get('secure_url')
        if not image_url:
            return jsonify({"error": "Image upload failed"}), 500

        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            public_id = cloudinary_response.get('public_id')
            if public_id:
                destroy(public_id)
            return jsonify({"error": "User not found"}), 404

        new_product = Product(
            title=title,
            description=description,
            price=price,
            gender=gender,
            category=category,
            image=image_url,
            user_id=user.id
        )

        db.session.add(new_product)
        db.session.commit()
        return jsonify({
            "message": "Product created successfully",
            "product": new_product.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        if 'cloudinary_response' in locals():
            public_id = cloudinary_response.get('public_id')
            if public_id:
                destroy(public_id)
        return jsonify({"error": str(e)}), 500

# Update a product
@product_bp.route('/products/<int:product_id>', methods=['PUT'])
@admin_required
def update_product(product_id):
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({"error": "Product not found"}), 404

        data = request.form
        required_fields = ['title', 'description', 'price', 'gender', 'category']
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f'Missing required field: {field}'}), 400

        product.title = data.get('title')
        product.description = data.get('description')
        product.price = float(data.get('price'))
        product.gender = data.get('gender')
        product.category = data.get('category')

        if 'image' in request.files and request.files['image']:
            new_image_file = request.files['image']
            cloudinary_response = upload(new_image_file)
            new_image_url = cloudinary_response.get('secure_url')
            if not new_image_url:
                return jsonify({"error": "Image upload failed"}), 500

            old_image_url = product.image
            if old_image_url:
                old_public_id = old_image_url.split('/')[-1].split('.')[0]
                destroy(old_public_id)

            product.image = new_image_url

        db.session.commit()
        return jsonify({
            "message": "Product updated successfully",
            "product": product.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        if 'cloudinary_response' in locals():
            public_id = cloudinary_response.get('public_id')
            if public_id:
                destroy(public_id)
        return jsonify({"error": str(e)}), 500

# Delete a product
@product_bp.route('/products/<int:product_id>', methods=['DELETE'])
@admin_required
def delete_product(product_id):
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({"error": "Product not found"}), 404

        image_url = product.image
        if image_url != 'default.png':
            public_id = image_url.split('/')[7].split('.')[0]
            destroy(public_id)

        db.session.delete(product)
        db.session.commit()
        return jsonify({
            "message": f"Product with ID {product_id} and its image deleted successfully"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error deleting product: {str(e)}"}), 500
    
    # Public route to get a single product by ID (for product page)
@product_bp.route('/product/<int:product_id>', methods=['GET'])
def get_single_product_customer(product_id):
    try:
        product = Product.query.get_or_404(product_id)
        return jsonify({
            "success": True,
            "product": product.to_dict()
        }), 200
    except SQLAlchemyError as e:
        return jsonify({"success": False, "error": f"Database error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"success": False, "error": f"Server error: {str(e)}"}), 500

# Get suggested products based on gender
@product_bp.route('/products/suggestions', methods=['GET'])
def get_suggested_products():
    try:
        gender = request.args.get('gender')
        if not gender:
            return jsonify({"error": "Missing required parameters"}), 400

        products = Product.query.filter_by(gender=gender).all()
        return jsonify({"products": [product.to_dict() for product in products]}), 200
    except Exception as e:
        return jsonify({"error": f"Error fetching suggested products: {str(e)}"}), 500
