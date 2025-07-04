import React from 'react';

const donationItems = [
  {
    title: 'Books',
    description: 'Donate educational books, novels, and learning materials to spread knowledge.',
    image: '/book.jpg',
  },
  {
    title: 'Clothes',
    description: 'Give away clean clothes to help someone in need stay warm and dignified.',
    image: '/clothes.jpg',
  },
  {
    title: 'Storage Accessories',
    description: 'Storage boxes, bags, and organizers can help others keep things safe.',
    image: '/storage.jpg',
  },
  {
    title: 'Food Packets',
    description: 'Provide ready-to-eat or non-perishable food to help feed the hungry.',
    image: '/food.jpg',
  },
  {
    title: 'Electronics Items',
    description: 'Old phones, laptops, or chargers can be reused by others in need.',
    image: '/electronics.png',
  },
];

const MainPage = () => {
  return (
    <div className="w-full px-4 py-8 space-y-16 max-w-6xl mx-auto">
      {donationItems.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            index % 2 !== 0 ? 'md:flex-row-reverse' : ''
          } items-center gap-8`}
        >
          {/* Text Section */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
          </div>

          {/* Image Section */}
          <div className="flex-1 flex justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-64 h-64 object-cover rounded-full shadow-md"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
