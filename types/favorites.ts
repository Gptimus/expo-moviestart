import { MediaType } from './api-results';

export type Favorite = {
  id: string;
  mediaType: MediaType;
  name: string;
  thumbnail: string;
};
