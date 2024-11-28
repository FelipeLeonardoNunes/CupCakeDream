import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Image, Button, Modal, Input, Icon } from 'semantic-ui-react';
import FavoritesNoBg from '../images/Favorites-no-bg.png';
import '../css/Styles.css'; // Certifique-se de que o caminho está correto

const Favorites = ({ userInfo }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!userInfo) return;

      try {
        const response = await axios.get(`https://localhost:44333/api/Favorite/GetFavoriteByUserId?userId=${userInfo.id}`);
        setFavoritos(response.data.$values);
      } catch (err) {
        console.error('Erro ao buscar favoritos:', err);
      }
    };

    fetchFavoritos();
  }, [userInfo]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('https://localhost:44333/api/Product/GetAll');
        const allProducts = response.data.$values;
        const favoriteProducts = allProducts.filter(product => 
          favoritos.some(favorite => favorite.productId === product.id && product.status)
        );
        setProdutos(favoriteProducts);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
      }
    };

    if (favoritos.length > 0) {
      fetchProdutos();
    }
  }, [favoritos]);

  const getImageUrl = (productId) => {
    const imageMap = {
      '1fbf4050-d201-44be-a350-08dd0daab58b': 'https://i.ibb.co/cC9fBqC/Cupcake-de-avel.jpg',
      '86bf21f2-f18a-4c50-a351-08dd0daab58b': 'https://i.ibb.co/4ZCbKVR/Cupcake-de-Cereja.jpg',
      'd0aa7c5b-c5e4-4148-a352-08dd0daab58b': 'https://i.ibb.co/ggPwjj7/Cupcake-Classico.jpg',
      'b33378f2-beb1-4d8f-a353-08dd0daab58b': 'https://i.ibb.co/61tppgH/Cupcake-de-Chocolate.jpg',
      '8ffc8a25-c170-4861-a354-08dd0daab58b': 'https://i.ibb.co/hWX4SK8/Cupcake-de-Baunilha.jpg',
      'f807d643-3766-4428-a355-08dd0daab58b': 'https://i.ibb.co/C0krV4B/Cupcake-de-Morango.jpg',
      '3969a2cf-81f8-4885-a356-08dd0daab58b': 'https://i.ibb.co/Wy6G4JG/Cupcake-de-Caf.jpg',
      'e0a81b60-47f5-479b-a357-08dd0daab58b': 'https://i.ibb.co/5BNHGbs/Cupcake-Red-Velvet.jpg'
    };

    return imageMap[productId] || 'https://i.ibb.co/placeholder.png';
  };

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleAddToCart = async () => {
    if (!userInfo) {
      alert('Você precisa estar logado para adicionar produtos ao carrinho.');
      return;
    }

    if (quantity < 1) {
      alert('Por favor, insira uma quantidade válida.');
      return;
    }

    const payload = {
      userId: userInfo.id,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      price: selectedProduct.price,
      quantity: quantity
    };

    try {
      await axios.post('https://localhost:44333/api/Cart/AddProductCart', payload);
      alert('Produto adicionado ao carrinho com sucesso!');
      handleClose();
    } catch (err) {
      console.error('Erro ao adicionar produto ao carrinho:', err);
      alert('Erro ao adicionar produto ao carrinho. Por favor, tente novamente.');
    }
  };

  const toggleFavorite = async (productId) => {
    if (!userInfo) {
      alert('Você precisa estar logado para favoritar produtos.');
      return;
    }

    const isFavorite = favoritos.some(favorite => favorite.productId === productId);
    const url = isFavorite
      ? 'https://localhost:44333/api/Favorite/DeleteFavorite'
      : 'https://localhost:44333/api/Favorite/CreateFavorite';

    try {
      const payload = { userId: userInfo.id, productId };
      if (isFavorite) {
        await axios.delete(url, { data: payload });
        setFavoritos(favoritos.filter(favorite => favorite.productId !== productId));
      } else {
        await axios.post(url, payload);
        setFavoritos([...favoritos, { productId }]);
      }
    } catch (err) {
      console.error(`Erro ao ${isFavorite ? 'remover' : 'adicionar'} favorito:`, err);
    }
  };

  return (
    <Container style={{ marginTop: '18px' }}>
      <h1 className='quicksand-font'>Favoritos</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', margin: '0 auto' }} className='quicksand-font'>
        Seus favoritos aparecem aqui e permitem a navegação e compra de produtos escolhidos mais rapidamente!
      </p>
      <div className='ui divider' style={{ marginTop: '20px', marginBottom: '20px' }}></div>
      <div className='ui hidden divider'></div>

      {produtos.length > 0 ? (
        <Card.Group itemsPerRow={3}>
          {produtos.map(produto => (
            <Card key={produto.id} className="product-card">
              <Image src={getImageUrl(produto.id)} wrapped ui={false} />
              <Card.Content>
                <Card.Header>
                  {produto.name}
                  <Icon
                    name={favoritos.some(favorite => favorite.productId === produto.id) ? 'heart' : 'heart outline'}
                    color={favoritos.some(favorite => favorite.productId === produto.id) ? 'red' : 'grey'}
                    onClick={(e) => {
                      e.stopPropagation(); // Evita que o clique no ícone abra o modal
                      toggleFavorite(produto.id);
                    }}
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                  />
                </Card.Header>
                <Card.Meta>
                  <span className='price'>R${produto.price.toFixed(2)}</span>
                </Card.Meta>
                <Card.Description>{produto.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>Mais informações: {produto.information}</a>
                <Button primary onClick={() => handleAddToCartClick(produto)} style={{ marginTop: '10px' }}>Adicionar ao Carrinho</Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      ) : (
        <Image centered size='large' src={FavoritesNoBg} />
      )}

      {selectedProduct && (
        <Modal open={open} onClose={handleClose}>
          <Modal.Header><h1 className='quicksand-font'>Adicionar ao Carrinho</h1></Modal.Header>
          <Modal.Content>
            <h3>{selectedProduct.name}</h3>
            <p><strong>Preço:</strong> R${selectedProduct.price.toFixed(2)}</p>
            <h4>Quantidade:</h4>
            <Input 
              type='number' 
              value={quantity} 
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} 
              min='1' 
            />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button primary onClick={handleAddToCart}>OK</Button>
          </Modal.Actions>
        </Modal>
      )}
    </Container>
  );
};

export default Favorites;
