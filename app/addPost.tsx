import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { postData } from '../services/api';

export default function AddPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('1');
  const [loading, setLoading] = useState(false);

  const submitPost = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert('Validation', 'Title and body are required.');
      return;
    }

    try {
      setLoading(true);
      const result = await postData({
        title: title.trim(),
        body: body.trim(),
        userId: Number(userId) || 1,
      });

      Alert.alert('Success', `Post created with id: ${result.id}`, [
        {
          text: 'Back to Home',
          onPress: () => router.back(),
        },
      ]);
    } catch {
      Alert.alert('Error', 'Failed to create new post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.formCard}>
        <Text style={styles.label}>User ID</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={userId}
          onChangeText={setUserId}
          placeholder="1"
        />

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Post title"
        />

        <Text style={styles.label}>Body</Text>
        <TextInput
          style={[styles.input, styles.bodyInput]}
          multiline
          textAlignVertical="top"
          value={body}
          onChangeText={setBody}
          placeholder="Write post content"
        />

        <View style={styles.buttonRow}>
          <Pressable style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.submitButton, loading && styles.buttonDisabled]}
            onPress={submitPost}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.submitText}>Submit</Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fbfcff',
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e4e9f7',
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: '#425172',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d5ddf3',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
    color: '#1f2a44',
  },
  bodyInput: {
    minHeight: 120,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 4,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#d5ddf3',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cancelText: {
    color: '#425172',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#2b5cff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    minWidth: 90,
    alignItems: 'center',
  },
  submitText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.75,
  },
});
