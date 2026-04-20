import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { getPosts, Post } from '../services/api';

export default function IndexPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPosts = async () => {
    try {
      setError('');
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch {
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>All Posts</Text>
        <Pressable style={styles.addButton} onPress={() => router.push('/addPost')}>
          <Text style={styles.addButtonText}>Add New Post</Text>
        </Pressable>
      </View>

      {loading ? <ActivityIndicator size="large" color="#2b5cff" /> : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {!loading ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => String(item.id)}
          onRefresh={loadPosts}
          refreshing={loading}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push(`/postDetail?postId=${item.id}`)}
            >
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text numberOfLines={2} style={styles.postBody}>
                {item.body}
              </Text>
            </Pressable>
          )}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fbfcff',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    gap: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2a44',
  },
  addButton: {
    backgroundColor: '#2b5cff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e4e9f7',
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    color: '#1f2a44',
    textTransform: 'capitalize',
  },
  postBody: {
    fontSize: 13,
    lineHeight: 18,
    color: '#5d6885',
  },
  errorText: {
    color: '#c62828',
    marginBottom: 10,
  },
});
