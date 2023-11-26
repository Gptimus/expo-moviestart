import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { FunctionComponent } from 'react';
import { ImageBackground } from 'react-native';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import Animated from 'react-native-reanimated';
import { Button, H1, Paragraph, ScrollView, Spinner, Text, YStack, useTheme } from 'tamagui';

import { getMovieDetailsByIdAndMediaType } from '@/services/api';
import { Main } from '@/tamagui.config';
import { MediaType } from '@/types/api-results';
import { Favorite } from '@/types/favorites';

type MovieDetailProps = {
  id: string;
  mediaType: MediaType;
};
export const MovieDetails: FunctionComponent<MovieDetailProps> = ({ id, mediaType }) => {
  const theme = useTheme();
  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetailsByIdAndMediaType(+id, mediaType),
  });

  const movie = movieQuery.data;
  const [isFavorite, setIsFavorite] = useMMKVBoolean(`${mediaType}-${id}`);
  const [favorites, setFavorites] = useMMKVObject<Favorite[]>('favorites');

  const toggleFavorite = () => {
    const current = favorites || [];
    if (!isFavorite) {
      setFavorites([
        ...current,
        { id, mediaType, thumbnail: movie?.poster_path!, name: movie?.title || movie?.name || '' },
      ]);
    } else {
      setFavorites(current.filter((fav) => fav.id !== id || fav.mediaType !== mediaType));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Main>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              scale={0.95}
              hoverStyle={{
                scale: 0.975,
              }}
              pressStyle={{
                scale: 0.975,
              }}
              animation="bouncy"
              onPress={toggleFavorite}
              unstyled>
              <Heart fill={isFavorite ? 'red' : theme.blue7.get()} size={26} />
            </Button>
          ),
        }}
      />
      <ScrollView>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`,
          }}>
          <Animated.Image
            source={{
              uri: `https://image.tmdb.org/t/p/w400${movie?.poster_path}`,
            }}
            style={{
              width: 200,
              height: 300,
              margin: 20,
              borderRadius: 6,
            }}
            sharedTransitionTag={`${mediaType === 'movie' ? 'movie' : 'tv'}-${id}`}
          />
        </ImageBackground>

        {movieQuery.isLoading && (
          <YStack f={1} jc="center">
            <Spinner size="large" color="$blue10" />
          </YStack>
        )}

        {!movieQuery.isLoading && (
          <YStack
            p={10}
            animation="lazy"
            enterStyle={{
              opacity: 0,
              y: 20,
            }}>
            <H1 color="$blue7">
              {movie?.title || movie?.name}
              <Text fontSize={16}>
                ({new Date(movie?.release_date! || movie?.first_air_date!).getFullYear()})
              </Text>
            </H1>
            <Paragraph theme="alt2">{movie?.tagline}</Paragraph>
            <Text fontSize={16}>{movie?.overview}</Text>
          </YStack>
        )}
      </ScrollView>
    </Main>
  );
};
