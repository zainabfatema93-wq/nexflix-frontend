import { useEffect, useState } from "react";
import { options } from "../Api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

const CardList = ({ title, Category }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${Category}?language=en-US&page=1`,
          options,
        );

        const result = await response.json();
        setData(result.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [Category]);
  console.log("Title:", title, "Category:", Category);

  return (
    <div className="text-white md:px-2">
      <h2 className="pt-2 pb-5 text-lg font-medium">{title}</h2>
      <Swiper slidesPerView={"auto"} spaceBetween={2} className="mySwiper">
        {data.map((item, index) => (
          <SwiperSlide key={index} className="max-w-72">
            <Link to={`/movie/${item.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className="w-70 h-60 object-cover rounded-xl"
              />
              <p className="text-center pt-2">{item.title}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardList;
