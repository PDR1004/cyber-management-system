from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


def create_product(db: Session, product_data: ProductCreate):
    new_product = Product(
        name=product_data.name,
        purchase_price=product_data.purchase_price,
        sale_price=product_data.sale_price,
        stock=product_data.stock,
        category=product_data.category
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

def get_products(db: Session): 
    products = db.query(Product).filter(Product.active == True).all()
    return products

def get_product_by_id(db: Session, product_id: int):
    product = db.query(Product).filter(
        Product.id == product_id, 
        Product.active == True
    ).first()

    return product

def update_product(db: Session, product_id: int, product_data: ProductUpdate):
    product = db.query(Product).filter(
        Product.id == product_id, 
        Product.active == True
    ).first()

    if not product:
        return None

    product.name = product_data.name
    product.purchase_price = product_data.purchase_price
    product.sale_price = product_data.sale_price
    product.stock = product_data.stock
    product.category = product_data.category

    db.commit()
    db.refresh(product)
    return product

def delete_product(db: Session, product_id: int):
    product = db.query(Product).fiter(
        Product.id == product_id
    ).first()

    if product:
        product.active = False
        db.commit()
        db.refresh(product)
    return True 


