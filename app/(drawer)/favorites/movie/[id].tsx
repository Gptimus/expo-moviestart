import { useLocalSearchParams } from 'expo-router';

import { MovieDetails } from '@/components/movie-details';
import { MediaType } from '@/types/api-results';

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <MovieDetails id={id} mediaType={MediaType.Movie} />;
}
