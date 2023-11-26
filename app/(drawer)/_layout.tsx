import { colorTokens } from '@tamagui/themes';
import Drawer from 'expo-router/drawer';
import { Home, Star } from 'lucide-react-native';

const Layout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: colorTokens.dark.blue.blue7,
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: { marginLeft: -20 },
      }}>
      <Drawer.Screen
        name="home"
        options={{
          title: 'Moviestar',
          headerShown: false,
          drawerIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          title: 'My Favorites',
          headerShown: false,
          drawerIcon: ({ color, size }) => <Star color={color} size={size} />,
        }}
      />
    </Drawer>
  );
};

export default Layout;
