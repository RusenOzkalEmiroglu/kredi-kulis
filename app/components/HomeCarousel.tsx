'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Swiper ve gerekli modülleri
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface CarouselItem {
  id: string;
  title?: string;
  image_url: string;
  link_url: string;
}

export default function HomeCarousel() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCarouselItems() {
      try {
        const response = await fetch('/api/carousel');
        if (!response.ok) {
          throw new Error('Carousel verileri alınamadı');
        }
        const data = await response.json();
        setCarouselItems(data);
      } catch (err) {
        console.error('Carousel yüklenirken hata oluştu:', err);
        setError('Carousel yüklenirken bir hata oluştu.');
        
        // Hata durumunda varsayılan olarak public/images/admin/Carousel klasöründeki resimleri kullan
        setCarouselItems([
          { id: '1', image_url: '/images/admin/Carousel/1.webp', link_url: '#' },
          { id: '2', image_url: '/images/admin/Carousel/2.webp', link_url: '#' },
          { id: '3', image_url: '/images/admin/Carousel/3.webp', link_url: '#' },
          { id: '4', image_url: '/images/admin/Carousel/4.webp', link_url: '#' },
          { id: '5', image_url: '/images/admin/Carousel/5.webp', link_url: '#' },
          { id: '6', image_url: '/images/admin/Carousel/6.webp', link_url: '#' },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchCarouselItems();
  }, []);

  if (loading) {
    return <div className="h-[504px] bg-gray-100 animate-pulse"></div>;
  }

  if (carouselItems.length === 0) {
    return null;
  }

  return (
    <div className="carousel-container w-full relative">
      <style jsx global>{`
        .home-carousel .swiper-pagination {
          position: absolute;
          bottom: 20px !important;
          z-index: 10;
        }
        
        .home-carousel .swiper-button-prev,
        .home-carousel .swiper-button-next {
          color: rgba(255, 255, 255, 0.8);
          background: rgba(0, 0, 0, 0.3);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .home-carousel .swiper-button-prev {
          left: 20px;
        }
        
        .home-carousel .swiper-button-next {
          right: 20px;
        }
        
        .home-carousel .swiper-button-prev:after,
        .home-carousel .swiper-button-next:after {
          font-size: 18px;
        }
        
        .home-carousel .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }
        
        .home-carousel .swiper-pagination-bullet-active {
          background: white;
          opacity: 1;
        }
      `}</style>
      
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="home-carousel"
      >
        {carouselItems.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={item.link_url} target="_blank" rel="noopener noreferrer">
              <div className="relative w-full overflow-hidden" style={{ maxHeight: '504px', height: 'auto' }}>
                <img 
                  src={item.image_url} 
                  alt={item.title || 'Carousel'} 
                  className="w-full h-auto object-contain max-h-[504px]"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
}
