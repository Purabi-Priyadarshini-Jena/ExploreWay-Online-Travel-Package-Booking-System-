import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import "aos/dist/aos.css";
import AOS from "aos";

// Gradient background styles for cards
const gradients = [
  "linear-gradient(135deg, #f6e476, #ebedee)",
  "linear-gradient(135deg, #e0c3fc, #8ec5fc)",
  "linear-gradient(135deg, #f6d365, #fda085)",
  "linear-gradient(135deg, #cfd9df, #e2ebf0)",
  "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Travel Blogger",
    review:
      "Travel Story made planning my trip to Bali a breeze! I just selected my preferences, and within minutes, I had a personalized travel package with great deals and local experiences. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Daniel Lee",
    role: "Adventure Seeker",
    review:
      "I’ve used many travel apps, but Travel Story stands out with its customization features. I booked a trip to Manali, and everything from the hotel to activities was tailored just for me.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Priya Mehta",
    role: "Frequent Traveller",
    review:
      "The best part about Travel Story is how effortless it is. I picked my destination—Jaipur—and the system gave me a complete itinerary with heritage stays and cultural tours. Loved it!",
    avatar: "https://i.pravatar.cc/150?img=31",
  },
  {
    name: "Carlos Ramirez",
    role: "Solo Backpacker",
    review:
      "As a solo traveler, I always look for flexible packages. Travel Story nailed it with my customized Leh-Ladakh trip—everything was well-organized and affordable.",
    avatar: "https://i.pravatar.cc/150?img=52",
  },
  {
    name: "Emily Wong",
    role: "Corporate Trip Planner",
    review:
      "We used Travel Story for our team’s offsite to Kerala. The package included everything from transport to team-building activities, all tailored to our needs. Super smooth experience!",
    avatar: "https://i.pravatar.cc/150?img=65",
  },
];

const TestimonialSec = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="relative py-24" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-4 z-0"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99004.jpg')", // Replace with your own image URL
        }}
      ></div>

      {/* Overlay Content */}
      <div className="relative z-10 max-w-11xl mx-auto px-3 text-center">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-20 py-12 mt-3"> 
          What Our <span className="text-amber-600">Travellers Say</span>
        </h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay]}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative rounded-2xl p-8 text-left shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                style={{ background: gradients[index % gradients.length] }}
              >
                <FaQuoteLeft className="text-indigo-200 text-5xl absolute top-4 left-4 opacity-10" />
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-md mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-800 text-base leading-relaxed italic">
                  “{testimonial.review}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSec;
