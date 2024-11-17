import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

export interface RecipeData {
  title: string;
  likeCount: number;
  category: string;
  images: string[];
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
