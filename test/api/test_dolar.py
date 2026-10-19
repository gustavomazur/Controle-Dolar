
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
