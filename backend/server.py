from flask import Flask, request, jsonify
from product_dao import get_all_products, insert_new_product, delete_product, update_product
from sql_connection import get_sql_connection

app = Flask(__name__)
connection = get_sql_connection()

@app.route('/getproducts', methods=['GET'])
def get_products():
    products = get_all_products(connection)
    response = jsonify(products)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    product_id = insert_new_product(connection, data)
    return jsonify({'product_id': product_id})

@app.route('/products/<int:product_id>', methods=['DELETE'])
def remove_product(product_id):
    result = delete_product(connection, product_id)
    return jsonify({'message': result})

@app.route('/products/<int:product_id>', methods=['PUT'])
def modify_product(product_id):
    data = request.get_json()
    result = update_product(connection, product_id, data)
    return jsonify({'message': result})

if __name__ == '__main__':
    print("Starting python flask server for grocery store management system")
    app.run(port=5000)