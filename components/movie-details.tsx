import { useQuery } from '@tanstack/react-query';
import { FunctionComponent } from 'react';
import { H1, Paragraph, ScrollView, Spinner, Text, YStack } from 'tamagui';

import { getMovieDetailsByIdAndMediaType } from '@/services/api';
import { Main } from '@/tamagui.config';
import { MediaType } from '@/types/api-results';
import { ImageBackground } from 'react-native';
import Animated from 'react-native-reanimated';

type MovieDetailProps = {
  id: string;
  mediaType: MediaType;
};
export const MovieDetails: FunctionComponent<MovieDetailProps> = ({ id, mediaType }) => {
  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetailsByIdAndMediaType(+id, mediaType),
  });

  const movie = movieQuery.data;

  return (
    <Main>
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
