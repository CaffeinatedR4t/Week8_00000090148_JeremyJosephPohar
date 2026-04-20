import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import {
  Comment,
  getPostComments,
  getPostDetail,
  getUserDetail,
  Post,
  User,
} from '../services/api';

export default function PostDetailPage() {
  const params = useLocalSearchParams<{ postId?: string }>();
  const postId = Number(params.postId);

  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPostDetail = async () => {
      if (!postId || Number.isNaN(postId)) {
        setError('Invalid post id.');
        setLoading(false);
        return;
      }

      try {
        setError('');
        setLoading(true);

        const postData = await getPostDetail(postId);
        const [userData, commentsData] = await Promise.all([
          getUserDetail(postData.userId),
          getPostComments(postId),
        ]);

        setPost(postData);
        setUser(userData);
        setComments(commentsData);
      } catch {
        setError('Failed to load post detail.');
      } finally {
        setLoading(false);
      }
    };

    loadPostDetail();
  }, [postId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2b5cff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.title}>{post?.title}</Text>
        <Text style={styles.body}>{post?.body}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Author</Text>
        <Text style={styles.metaText}>Name: {user?.name}</Text>
        <Text style={styles.metaText}>Email: {user?.email}</Text>
        <Text style={styles.metaText}>Phone: {user?.phone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Comments</Text>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.commentCard}>
            <Text style={styles.commentName}>{comment.name}</Text>
            <Text style={styles.commentEmail}>{comment.email}</Text>
            <Text style={styles.commentBody}>{comment.body}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfcff',
    padding: 16,
  },
  screen: {
    flex: 1,
    backgroundColor: '#fbfcff',
  },
  content: {
    padding: 16,
    paddingBottom: 24,
    gap: 12,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e4e9f7',
    padding: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1f2a44',
    textTransform: 'capitalize',
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    color: '#5d6885',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2a44',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#425172',
    marginBottom: 4,
  },
  commentCard: {
    paddingTop: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#edf1fb',
  },
  commentName: {
    fontWeight: '700',
    color: '#1f2a44',
    marginBottom: 3,
    textTransform: 'capitalize',
  },
  commentEmail: {
    color: '#2b5cff',
    marginBottom: 4,
    fontSize: 12,
  },
  commentBody: {
    color: '#5d6885',
    lineHeight: 18,
  },
  errorText: {
    color: '#c62828',
    fontSize: 15,
  },
});
