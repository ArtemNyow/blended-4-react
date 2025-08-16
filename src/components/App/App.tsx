import { useState } from "react";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import type { Photo } from "../../types/photo";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Modal from "../Modal/Modal";  // імпорт модалки
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Стейт для обраного фото у модалці
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const onSubmit = async (query: string) => {
    setIsLoading(true);
    setIsEmpty(false);
    setPhotos([]);
    try {
      const data = await getPhotos(query);
      if (!data.length) {
        toast.error(`We don't find photos with "${query}"`);
        setIsEmpty(true);
        return;
      }
      setPhotos(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Функція для відкриття модалки з фото
  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  // Функція закриття модалки
  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={onSubmit} />
          {photos.length > 0 && (
            <PhotosGallery photo={photos} onPhotoClick={openModal} />
          )}
          {isEmpty && <Text textAlign="center">We don`t find photos</Text>}
          {isLoading && <Loader />}
        </Container>
      </Section>

      {selectedPhoto && (
        <Modal onClose={closeModal}>
          <img src={selectedPhoto.src.original} alt={selectedPhoto.alt} />
        </Modal>
      )}
    </>
  );
}
