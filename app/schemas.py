from pydantic import BaseModel
from typing import Optional



class DolarCreate(BaseModel):
    title: str
    preco_dolar: float
    preco_do_produto_em_dolar: float
    
class DolarResponse(BaseModel):
    id: int
    title: str
    preco_dolar: float
    preco_do_produto_em_dolar: float
    preco_do_produto_em_reais: float
    class Config:
        from_attributes = True

class DividaListResponse(BaseModel):
    produto: list[DolarResponse]
    total: float

