import mysql.connector

cnx = mysql.connector.connect(user='root', password='Sanu9988$',
                              host='127.0.0.1',
                              database='gs')

cursor = cnx.cursor()
query = "SELECT * FROM gs.products"
cursor.execute(query)

for (products_id, name, uom_id, price_per_unit) in cursor:
    print(products_id, name, uom_id, price_per_unit)

cnx.close()

