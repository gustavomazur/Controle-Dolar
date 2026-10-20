from fastapi.testclient import TestClient
import pytest
from app.main import app
from app import models

#test pra quanto eu precisar de um client para fazer requisições para a API
@pytest.fixture(scope="function")
def client():
    with TestClient(app) as c:
        yield c

@pytest.fixture
def test_post(monkeypatch):
    new_dolar = [
        {
            "title": "Gabi Camiseta",
            "preco_dolar": 5.0,
            "preco_do_produto_em_dolar": 200.0
        }
    ]

    monkeypatch.setattr(models, "my_db_dolar", [])
    return new_dolar

@pytest.fixture
def test_dolares(monkeypatch):
    dolares = [{"id": 1,
                "title": "Gabi camiseta",
                "preco_dolar": 5.0,
                "preco_do_produto_em_dolar": 100.0,
                "preco_do_produto_em_reais": 500.0}]


    monkeypatch.setattr(models, "my_db_dolar", dolares)
    return dolares


