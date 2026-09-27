import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const user = userEvent.default || userEvent;

jest.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div>{children}</div>,
  SwiperSlide: ({ children }) => <div>{children}</div>,
}), { virtual: true });

jest.mock('swiper/modules', () => ({
  Navigation: {},
}), { virtual: true });

jest.mock('swiper/css', () => ({}), { virtual: true });
jest.mock('swiper/css/navigation', () => ({}), { virtual: true });

const topAlbums = Array.from({ length: 7 }, (_, index) => ({
  id: index + 1,
  title: `Top Album ${index + 1}`,
  image: `https://example.com/top-${index + 1}.jpg`,
  follows: 100 + index,
  slug: `top-${index + 1}`,
}));

const newAlbums = Array.from({ length: 7 }, (_, index) => ({
  id: index + 1,
  title: `New Album ${index + 1}`,
  image: `https://example.com/new-${index + 1}.jpg`,
  follows: 200 + index,
  slug: `new-${index + 1}`,
}));

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((input) => {
    const url = String(input);

    if (url.includes('/albums/top')) {
      return Promise.resolve({
        json: async () => topAlbums,
      });
    }

    if (url.includes('/albums/new')) {
      return Promise.resolve({
        json: async () => newAlbums,
      });
    }

    return Promise.resolve({
      json: async () => [],
    });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders Top and New Albums and expands them with Show All', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(await screen.findByText('Top Albums')).toBeInTheDocument();
  expect(await screen.findByText('New Albums')).toBeInTheDocument();
  expect(await screen.findByText('Top Album 1')).toBeInTheDocument();
  expect(await screen.findByText('New Album 1')).toBeInTheDocument();

  const topShowAllButtons = screen.getAllByRole('button', { name: /show all/i });
  expect(topShowAllButtons.length).toBeGreaterThanOrEqual(2);

  await user.click(topShowAllButtons[0]);

  await waitFor(() => {
    expect(screen.getByText('Top Album 7')).toBeInTheDocument();
  });

  const newShowAllButton = screen.getAllByRole('button', { name: /show all/i })[0];
  await user.click(newShowAllButton);

  await waitFor(() => {
    expect(screen.getByText('New Album 7')).toBeInTheDocument();
  });
});
