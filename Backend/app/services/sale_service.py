from sqlalchemy.orm import Session
from datetime import datetime

from app.models.sale import Sale
from app.models.sale_detail import SaleDetail
from app.models.product import Product

from app.schemas.sale import SaleCreate

def create_sale (db: Session, sale_data: SaleCreate):
    try:
        new_sale = Sale(
            sale_date = datetime.now(),
            total = 0
        )
        db.add(new_sale)
        db.flush()

        sale_total = 0

        for item in sale_data.products:
            product = db.query(Product).filter(
                Product.id == item.product_id,
                Product.active == True
            ).first()

            if product is None:
                raise ValueError("Product not found or inactive")
            
            if product.stock < item.quantity:
                raise ValueError(
                    f"Insufficient stock for product {product.name}"
                )
            
            quantity = item.quantity
            price = product.sale_price
            
            subtotal = quantity * price

            detail = SaleDetail(
                sale_id = new_sale.id,
                product_id = product.id,
                quantity = quantity,
                unit_price = price,
                subtotal = subtotal
            )
            db.add(detail)

            product.stock -= quantity
            sale_total += subtotal

        new_sale.total = sale_total

        db.commit()

        db.refresh(new_sale)

        return new_sale
    
    except Exception:
        db.rollback()
        raise


def get_sales (db: Session):
    return db.query(Sale).all()

def get_sale_by_id (db: Session, id: int):
    return db.query(Sale).filter(
        Sale.id == id
    ).first()
