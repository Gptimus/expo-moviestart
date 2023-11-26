import { Link } from 'expo-router';
import { useMMKVObject } from 'react-native-mmkv';
import Animated from 'react-native-reanimated';
import { ListItem, ScrollView } from 'tamagui';

import { Container, Main } from '@/tamagui.config';
import { Favorite } from '@/types/favorites';

const Page = () => {
  const [favorites] = useMMKVObject<Favorite[]>('favorites');
  return (
    <Main>
      <Container>
        <ScrollView>
          {favorites?.map((favorite) => (
            <Link
              key={favorite.id}
              href={`/(drawer)/favorites/${favorite.mediaType}/${favorite.id}`}
              asChild
              style={{
                overflow: 'hidden',
              }}>
              <ListItem
                theme="alt2"
                title={favorite.name}
                icon={() => (
                  <Animated.Image
                    source={{ uri: `https://image.tmdb.org/t/p/w200${favorite.thumbnail}` }}
                    alt={favorite.name}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                    sharedTransitionTag={`${favorite.mediaType}-${favorite.id}`}
                  />
                )}
              />
            </Link>
          ))}
        </ScrollView>
      </Container>
    </Main>
  );
};

export default Page;
