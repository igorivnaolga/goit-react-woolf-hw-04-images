import { useState } from 'react';
import { ImgGalleryItem, ImgGallery } from './ImageGalleryItem.styled';
import { ImageModal } from '../Modal/Modal';

export const ImageGalleryItem = ({ image, largeImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
  };

  return (
    <>
      <ImgGalleryItem onClick={handleModal}>
        <ImgGallery src={image} alt="" />
      </ImgGalleryItem>
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={handleModal}
          largeImg={largeImage}
        />
      )}
    </>
  );
};
