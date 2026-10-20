
from app import models

def test_post(client, test_post):
    
    for indice, new_dolar in enumerate(test_post, start=1):
        response = client.post("/dolar/", json=new_dolar)

        assert response.status_code == 201
        assert response.json() == {"id": indice,
                                   "title": new_dolar["title"],
                                   "preco_dolar": new_dolar["preco_dolar"],
                                   "preco_do_produto_em_dolar": new_dolar["preco_do_produto_em_dolar"],
                                   "preco_do_produto_em_reais": (new_dolar["preco_dolar"] 
                                                                 * new_dolar["preco_do_produto_em_dolar"])}


def test_get(client, monkeypatch):

    dolares = [{"id": 1,
                "title": "Gabi camiseta",
                "preco_dolar": 5.0,
                "preco_do_produto_em_dolar": 200.0,
                "preco_do_produto_em_reais": 1000.0},

                {"id": 2,
                 "title": "Gabi Tenis",
                 "preco_dolar": 5.0,
                 "preco_do_produto_em_dolar": 100.0,
                 "preco_do_produto_em_reais": 500.0}]

    monkeypatch.setattr(models, "my_db_dolar", dolares)

    response = client.get("/dolar/")

    assert response.status_code == 200

    assert response.json() == {"produto": dolares,
                               "total": 1500.0}
    assert response.headers["X-Total-Dolar"] == "1500.0"


def test_put(client, test_dolares):
    dados_atulizados = {"title": "Gabi Camiseta nike",
                        "preco_dolar": 5.20,
                        "preco_do_produto_em_dolar":120.0}

    response = client.put("/dolar/1", json=dados_atulizados)

    assert response.status_code == 200
    assert response.json()["id"] == 1
    assert response.json()["title"] == "Gabi Camiseta nike"
    assert response.json()["preco_do_produto_em_reais"] == 624

def test_put_nao_encontrado(client, test_dolares):
    dados = {"title": "Lorena Tenis adidas",
             "preco_dolar": 5.0,
             "preco_do_produto_em_dolar": 100.0}

    response = client.put("/dolar/999", json=dados)

    assert response.status_code == 404
    assert response.json() == {"detail": "Dólar não encontrado"}