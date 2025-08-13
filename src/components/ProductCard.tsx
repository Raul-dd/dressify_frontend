import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { Product } from '../types/Product';

export default function ProductCard({
  product,
  onPress,
}: {
  product: Product;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {product.image_path && (
        <Image
          source={{
            uri: `http://127.0.0.1:8000/api/products/storage/${product.image_path}`,
          }}
          style={styles.image}
        />
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: { width: 80, height: 80 },
  info: { flex: 1, padding: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
  price: { color: '#888', marginTop: 4 },
});
