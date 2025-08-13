import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Button,
  ScrollView,
} from 'react-native';
import { getProductById, deleteProduct } from '../services/productsApi';
import { Product } from '../types/Product';

export default function ProductDetail({ route, navigation }: any) {
  const { id } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  if (!product) return <Text>No encontrado</Text>;

  return (
    <ScrollView style={styles.container}>
      {product.image_path && (
        <Image
          source={{
            uri: `http://127.0.0.1:8000/api/products/storage/${product.image_path}`,
          }}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.actions}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('ProductForm', { id: product.id })}
        />
        <Button title="Eliminar" color="red" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 'bold' },
  price: { fontSize: 18, color: '#555', marginVertical: 8 },
  description: { fontSize: 14, color: '#666' },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
