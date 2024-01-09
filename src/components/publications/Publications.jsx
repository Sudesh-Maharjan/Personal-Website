import React from 'react';
import BookCard from '../layouts/BookCard';
import { sample } from '../../assets';
import BannerTitle from '../layouts/BannerTitle';

const Publications = () => {
  return (
    <div>
      <BannerTitle title="Publications - 2021" />

      <div className="flex pb-4 mt-10 space-x-4 overflow-x-auto slider">
        <BookCard
          bkimg={sample}
          title="Book1"
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur corrupti omnis perferendis? Tenetur ea reprehenderit obcaecati."
        />
        <BookCard
          bkimg={sample}
          title="Book1"
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur corrupti omnis perferendis? Tenetur ea reprehenderit obcaecati."
        />
        <BookCard
          bkimg={sample}
          title="Book1"
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur corrupti omnis perferendis? Tenetur ea reprehenderit obcaecati."
        />
        <BookCard
          bkimg={sample}
          title="Book1"
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur corrupti omnis perferendis? Tenetur ea reprehenderit obcaecati."
        />
        <BookCard
          bkimg={sample}
          title="Book1"
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur corrupti omnis perferendis? Tenetur ea reprehenderit obcaecati."
        />
        <BookCard
          bkimg={sample}
          title="Book1"
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur corrupti omnis perferendis? Tenetur ea reprehenderit obcaecati."
        />
      </div>
    </div>
  );
};

export default Publications;
