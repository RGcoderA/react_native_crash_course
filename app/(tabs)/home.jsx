import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View, StyleSheet } from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";

const Home = () => {
  const { data: posts, refetch, error: postsError, isLoading: isPostsLoading } = useAppwrite(getAllPosts);
  const { data: latestPosts, error: latestPostsError, isLoading: isLatestLoading } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (postsError || latestPostsError) {
      Alert.alert("Error", "Failed to load posts. Please try again.");
    }
  }, [postsError, latestPostsError]);

  const loadingState = isPostsLoading || isLatestLoading;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <View>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.usernameText}>JSMastery</Text>
              </View>

              <View style={styles.logoContainer}>
                <Image
                  source={images.logoSmall}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View style={styles.trendingContainer}>
              <Text style={styles.latestVideosText}>Latest Videos</Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={loadingState && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: 'pmedium',
    color: '#B0B0B0',
  },
  usernameText: {
    fontSize: 24,
    fontFamily: 'psemibold',
    color: '#FFF',
  },
  logoContainer: {
    marginTop: 12,
  },
  logo: {
    width: 36,
    height: 40,
  },
  trendingContainer: {
    paddingTop: 20,
    paddingBottom: 32,
  },
  latestVideosText: {
    fontSize: 18,
    fontFamily: 'pregular',
    color: '#B0B0B0',
    marginBottom: 12,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#B0B0B0',
    fontSize: 16,
  },
});

export default Home;
