from fastapi import APIRouter, Depends, HTTPException, status, Response
from typing import List
from .. import models, schemas


router = APIRouter(
    prefix="/dolar",
    tags=["Dolar"]
)


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.DolarResponse)
def create_divida(dolar: schemas.DolarCreate):
    
    new_dolar = dolar.model_dump()

    new_dolar["id"] = max(
        (dolar["id"] for dolar in models.my_db_dolar),
        default=0
    ) + 1

    preco_dolar = new_dolar["preco_dolar"]
    preco_do_produto_em_dolar = new_dolar["preco_do_produto_em_dolar"]
    preco_do_produto_em_reais = preco_dolar * preco_do_produto_em_dolar
    new_dolar["preco_do_produto_em_reais"] = preco_do_produto_em_reais

    models.my_db_dolar.append(new_dolar)
    
    return new_dolar

@router.get("/", status_code=status.HTTP_200_OK, response_model=schemas.DividaListResponse)
def get_dividas(response: Response):

    lista_dolar = models.my_db_dolar

    total_somado = sum(dolar["preco_do_produto_em_reais"] for dolar in lista_dolar)

    response.headers["X-Total-Dolar"] = str(total_somado)

    return {
        "produto": lista_dolar,
        "total": total_somado
    }

@router.put("/{dolar_id}", status_code=status.HTTP_200_OK, response_model=schemas.DolarResponse)
def update_divida(dolar_id: int, dolar: schemas.DolarCreate):
    for index, existing_dolar in enumerate(models.my_db_dolar):
        if existing_dolar["id"] == dolar_id:
            updated_dolar = dolar.model_dump()
            updated_dolar["id"] = dolar_id

            preco_dolar = updated_dolar["preco_dolar"]
            preco_do_produto_em_dolar = updated_dolar["preco_do_produto_em_dolar"]
            preco_do_produto_em_reais = preco_dolar * preco_do_produto_em_dolar
            updated_dolar["preco_do_produto_em_reais"] = preco_do_produto_em_reais

            models.my_db_dolar[index] = updated_dolar
            return updated_dolar

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Dólar não encontrado")






