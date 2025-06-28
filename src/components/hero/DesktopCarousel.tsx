
interface CarouselItem {
  sub: string;
  btn1: string;
  btn2: string;
}

interface DesktopCarouselProps {
  currentItem: CarouselItem;
}

const DesktopCarousel = ({ currentItem }: DesktopCarouselProps) => {
  const { sub, btn1, btn2 } = currentItem;

  return (
    <div className="absolute bottom-10 left-[200px] z-10 max-w-md">
      <p className="text-base text-white/90 mb-6 leading-relaxed">
        {sub}
      </p>
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-lg">
          {btn1}
        </button>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-lg">
          {btn2}
        </button>
      </div>
    </div>
  );
};

export default DesktopCarousel;
