import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ImageBackground } from 'react-native';
import { Input, Spinner, YStack, ScrollView } from 'tamagui';

import { MovieCard } from '@/components/movie-card';
import { getSearchResults, getTrending } from '@/services/api';
import { Container, Main, Subtitle, Title } from '@/tamagui.config';

const Page = () => {
  const [searchString, setSearchString] = useState<string>('');

  const trendingQuery = useQuery({ queryKey: ['trending'], queryFn: () => getTrending() });

  const searchQuery = useQuery({
    queryKey: ['search', searchString],
    queryFn: () => getSearchResults(searchString),
  });

  return (
    <Main>
      <ImageBackground
        source={{
          uri: 'https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/u0BDggs80FG9tyZwxWTzVTDQls0.jpg',
        }}
        style={{
          width: '100%',
          height: 200,
        }}>
        <Container>
          <YStack>
            <Title
              color="#fff"
              enterStyle={{
                opacity: 0,
                scale: 1.5,
                y: -10,
              }}
              animation="quick">
              Trending
            </Title>
            <Input
              placeholder="Search for a movie, tv show, person..."
              placeholderTextColor="#fff"
              borderWidth={0}
              size="$4"
              value={searchString}
              onChangeText={setSearchString}
            />
          </YStack>
        </Container>
      </ImageBackground>
      <Subtitle
        p={10}
        enterStyle={{
          opacity: 0,
        }}
        animation="lazy">
        Trending
      </Subtitle>
      {(trendingQuery.isLoading || searchQuery.isLoading) && (
        <Spinner size="large" color="$blue10" />
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        py={10}
        contentContainerStyle={{
          gap: 14,
          paddingLeft: 14,
          paddingRight: 14,
        }}>
        {trendingQuery.data?.results.map((item) => <MovieCard movie={item} key={item.id} />)}
      </ScrollView>
    </Main>
  );
};

export default Page;
