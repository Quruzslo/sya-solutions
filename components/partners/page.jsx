import Image from "next/image";
import { Partners } from "./partners";
import styles from "./PartnerCarousel.module.css";

const PartnerCarousel = () => {
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselTrack}>
        {[...Partners, ...Partners].map((partner, index) => (
          <div key={index} className={styles.partnerLogoWrapper}>
            <div className={styles.imageContainer}>
              <Image
                src={partner.img}
                alt={partner.name}
                fill
                className={styles.partnerImage}
                sizes="140px"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerCarousel;
