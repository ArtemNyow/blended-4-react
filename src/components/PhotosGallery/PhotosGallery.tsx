import type { Photo } from "../../types/photo";
import Grid from "../Grid/Grid";
import GridItem from "../GridItem/GridItem";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps{
  photo: Photo[];
    onPhotoClick: (photo: Photo) => void;
}
export default function PhotosGallery({ photo ,onPhotoClick}: PhotosGalleryProps) { 
  return (
    <Grid>
      {photo.map((photo) => {
        return (
          <GridItem key={photo.id}>
<PhotosGalleryItem photo={photo} onClick={onPhotoClick} />
          </GridItem>
        )
      })}
    </Grid>
  )
}