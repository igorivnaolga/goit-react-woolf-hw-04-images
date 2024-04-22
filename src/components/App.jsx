import { useEffect, useState } from 'react';
import { fetchImages } from './service/API';
import { Searchbar } from './Searchbar/Searchbar';
import { Container } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    async function getPages() {
      try {
        setIsLoading(true);
        setError(false);

        const response = await fetchImages(query, page);
        const { hits, totalHits } = response;

        setImages(prevImages => [...prevImages, ...hits]);
        setIsLoading(false);
        setTotalPages(Math.ceil(totalHits / 12));
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getPages();
  }, [query, page]);

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const galleryImages = images.length !== 0;
  const notLastPage = page < totalPages;

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      {error && (
        <p>Oops! Something went wrong! Please try reloading this page!</p>
      )}
      <Loader isLoading={isLoading} />

      {galleryImages && <ImageGallery images={images} />}
      {galleryImages && notLastPage && (
        <Button btnName="Load more" onClick={handleLoadMore} />
      )}
    </Container>
  );
};
