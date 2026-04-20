import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f2f6ff' },
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Posts' }} />
      <Stack.Screen name="postDetail" options={{ title: 'Post Detail' }} />
      <Stack.Screen name="addPost" options={{ title: 'Add New Post' }} />
    </Stack>
  );
}
