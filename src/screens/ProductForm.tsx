import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  createProduct,
  updateProduct,
  getProductById,
} from '../services/productsApi';

export default function ProductForm({ route, navigation }: any) {
  const { id } = route.params || {};
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [code, setCode] = useState('');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setName(data.name);
      setDescription(data.description || '');
      setPrice(String(data.price));
      setStock(String(data.stock));
      setCode(data.code);
      if (data.image_path) {
        setImage(
          `http://http://127.0.0.1:8000/api/products/storage/${data.image_path}`,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('code', code);

      if (image && !image.startsWith('http')) {
        const fileName = image.split('/').pop() || 'photo.jpg';
        const ext = fileName.split('.').pop();
        formData.append('image', {
          uri: image,
          name: fileName,
          type: `image/${ext}`,
        } as any);
      }

      if (id) {
        await updateProduct(id, formData);
        Alert.alert('Éxito', 'Producto actualizado');
      } else {
        await createProduct(formData);
        Alert.alert('Éxito', 'Producto creado');
      }

      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo guardar el producto');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Stock</Text>
      <TextInput
        style={styles.input}
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Código</Text>
      <TextInput style={styles.input} value={code} onChangeText={setCode} />

      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Seleccionar imagen" onPress={pickImage} />

      <Button title={id ? 'Actualizar' : 'Crear'} onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginTop: 8, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4 },
  image: { width: '100%', height: 200, marginVertical: 10 },
});
