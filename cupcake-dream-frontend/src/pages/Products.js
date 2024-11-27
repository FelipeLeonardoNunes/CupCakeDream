import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Image, Modal, Button, Input, Icon, Segment } from 'semantic-ui-react';
import '../css/Styles.css'; // Certifique-se de que o caminho está correto

const Products = ({ isLoggedIn, userInfo }) => {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [favorites, setFavorites] = useState([]); // Estado para armazenar favoritos

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('https://localhost:44333/api/Product/GetAll');
        setProdutos(response.data.$values);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
      }
    };

    fetchProdutos();
  }, []);

  useEffect(() => {
    if (isLoggedIn && userInfo) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(`https://localhost:44333/api/Favorite/GetFavoriteByUserId?userId=${userInfo.id}`);
          const favoriteProductIds = response.data.$values.map(fav => fav.productId);
          setFavorites(favoriteProductIds);
        } catch (err) {
          console.error('Erro ao buscar favoritos:', err);
        }
      };

      fetchFavorites();
    }
  }, [isLoggedIn, userInfo]);

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

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    setQuantity(1);
  };

  const toggleFavorite = async (productId) => {
    if (!isLoggedIn || !userInfo) {
      alert('Você precisa estar logado para favoritar produtos.');
      return;
    }

    const isFavorite = favorites.includes(productId);
    const url = isFavorite
      ? 'https://localhost:44333/api/Favorite/DeleteFavorite'
      : 'https://localhost:44333/api/Favorite/CreateFavorite';

    try {
      const payload = { userId: userInfo.id, productId };
      if (isFavorite) {
        await axios.delete(url, { data: payload });
        setFavorites(favorites.filter(id => id !== productId));
      } else {
        await axios.post(url, payload);
        setFavorites([...favorites, productId]);
      }
    } catch (err) {
      console.error(`Erro ao ${isFavorite ? 'remover' : 'adicionar'} favorito:`, err);
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn || !userInfo) {
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

  return (
    <Container style={{ marginTop: '18px' }}>
      <h1 className='quicksand-font'>Nossos Produtos</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', margin: '0 auto' }} className='quicksand-font'>Descubra os incriveis sabores que preparamos para você! Clique no Cupcake para encomendar ou saber mais.</p>
      <div className='ui divider' style={{ marginTop: '20px', marginBottom: '20px' }}></div>
      <Segment>
      <Card.Group itemsPerRow={3}>
        {produtos.map(produto => (
          <Card key={produto.id} className="product-card" onClick={() => handleCardClick(produto)}>
            <Image src={getImageUrl(produto.id)} wrapped ui={false} />
            <Card.Content>
              <Card.Header>
                {produto.name}
                <Icon
                  name={favorites.includes(produto.id) ? 'heart' : 'heart outline'}
                  color={favorites.includes(produto.id) ? 'red' : 'grey'}
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
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      </Segment>

      {selectedProduct && (
        <Modal open={open} onClose={handleClose}>
          <Modal.Header><h1 className='quicksand-font'>Detalhes do produto</h1></Modal.Header>
          <Modal.Content image>
            <Image size='medium' src={getImageUrl(selectedProduct.id)} wrapped />
            <Modal.Description>
              <h3>Informações -</h3>
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <p><strong>Preço:</strong> R${selectedProduct.price.toFixed(2)}</p>
              <h4>Quantidade:</h4>
              <Input 
                type='number' 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} 
                min='1' 
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button primary onClick={handleAddToCart}>Adicionar ao carrinho</Button>
          </Modal.Actions>
        </Modal>
      )}
    </Container>
  );
};

export default Products;
