import PropTypes from "prop-types";
import GalleryItem from "./GalleryItem";
import "./Gallery.css";

function GalleryGrid({
  images,
  selectedImages,
  isSelectionMode,
  onImageClick,
}) {
  return (
    <div className="gallery-grid">
      {images.map((imageUrl, index) => (
        <GalleryItem
          key={`${imageUrl}-${index}`}
          imageUrl={imageUrl}
          index={index}
          isSelected={selectedImages.includes(imageUrl)}
          isSelectionMode={isSelectionMode}
          onClick={() => onImageClick(index)}
        />
      ))}
    </div>
  );
}

GalleryGrid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  isSelectionMode: PropTypes.bool.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default GalleryGrid;
