module.exports = {
  venueTypes: [
    { id: 1, type: 'Apartment', iconPath: '/assets/lotties/House.json' },
    { id: 2, type: 'Resort', iconPath: '/assets/lotties/Resort.json' },
    { id: 3, type: 'Camping', iconPath: '/assets/lotties/Camping.json' },
    { id: 4, type: 'Amusement', iconPath: '/assets/lotties/RollerCoaster.json' },
  ],
  venues: [
    {
      id: 1,
      name: 'Urbanite High-Rise',
      typeId: 1,
      rating: 4.7,
      price: 130,
      imageUrls: ['/assets/images/1-1-1.jpg', '/assets/images/1-1-2.jpg', '/assets/images/1-1-3.jpg'],
      description: 'Modern and chic, located in the heart of the city, close to popular attractions, restaurants, and nightlife.',
      amenities: ['Free Wi-Fi', 'Kitchen', 'Air Conditioning', 'TV', 'Washer', 'Dryer', 'Elevator', 'Parking'],
    },
    {
      id: 2,
      name: 'Sapphire Shores',
      typeId: 2,
      rating: 5.0,
      price: 325,
      imageUrls: ['/assets/images/2-1-1.jpg', '/assets/images/2-1-2.jpg'],
      description: 'A serene getaway, featuring pristine beaches and crystal-clear waters, offering a luxurious and tranquil experience.',
      amenities: ['Swimming Pool', 'Beach Access', 'Spa', 'Fitness Center', 'Restaurant', 'Bar', 'Free Wi-Fi', 'Concierge'],
    },
    {
      id: 3,
      name: 'Crestwood Camping Grounds',
      typeId: 3,
      rating: 4.4,
      price: 45,
      imageUrls: ['/assets/images/3-1-1.jpg', '/assets/images/3-1-2.jpg', '/assets/images/3-1-3.jpg'],
      description: 'Nestled in a lush forest, this camping site offers a rugged yet peaceful retreat with hiking trails and wildlife spotting.',
      amenities: ['Fire Pits', 'Nature Trails', 'Picnic Tables', 'Public Restrooms', 'Guided Tours', 'Wildlife Viewing'],
    },
    {
      id: 4,
      name: 'Whimsical Wonderland',
      typeId: 4,
      rating: 4.5,
      price: 80,
      imageUrls: ['/assets/images/4-1-1.jpg', '/assets/images/4-1-2.jpg', '/assets/images/4-1-3.jpg'],
      description: 'A magical amusement park offering thrilling rides, enchanting attractions, and delicious eateries for a day full of fun.',
      amenities: ['Roller Coasters', 'Family Rides', 'Live Entertainment', 'Food Courts', 'Locker Rentals', 'First Aid Station'],
    },
    {
      id: 5,
      name: 'Lavender Luxury Loft',
      typeId: 1,
      rating: 4.8,
      price: 180,
      imageUrls: ['/assets/images/1-2-1.jpg', '/assets/images/1-2-2.jpg', '/assets/images/1-2-3.jpg'],
      description: 'A stylish loft with elegant furnishings, offering a cozy and relaxing stay with panoramic city views.',
      amenities: ['Free Wi-Fi', 'Panoramic Views', 'Smart TV', 'Fully Equipped Kitchen', 'Gym Access', 'Parking'],
    },
    {
      id: 6,
      name: 'Pine Peak Campsite',
      typeId: 3,
      rating: 4.2,
      price: 55,
      imageUrls: ['/assets/images/3-2-1.jpg', '/assets/images/3-2-2.jpg'],
      description: 'A serene camping site set amidst towering pines, offering a tranquil retreat for nature lovers.',
      amenities: ['Picnic Tables', 'Fire Pits', 'Restrooms', 'Shower Facilities', 'Hiking Trails', 'Pet-Friendly'],
    },
    {
      id: 7,
      name: 'Sunnydale Holiday Resort',
      typeId: 2,
      rating: 4.6,
      price: 275,
      imageUrls: ['/assets/images/2-2-1.jpg', '/assets/images/2-2-2.jpg'],
      description: 'A family-friendly resort featuring spacious rooms, multiple pools, and a variety of recreational activities.',
      amenities: ['Multiple Pools', 'Kids Club', 'All-Inclusive Option', 'Entertainment', 'Fitness Center', 'Free Wi-Fi'],
    },
    {
      id: 8,
      name: 'Aqua Adventure Water Park',
      typeId: 4,
      rating: 4.3,
      price: 90,
      imageUrls: ['/assets/images/4-2-1.jpg', '/assets/images/4-2-2.jpg', '/assets/images/4-2-3.jpg'],
      description: 'A splash-tastic water park featuring a variety of water rides, wave pools, and relaxation areas for a fun-filled day.',
      amenities: ['Various Water Rides', 'Wave Pools', 'Food Courts', 'Locker Rentals', 'First Aid Station', 'Parking'],
    },
    {
      id: 9,
      name: 'Metropolitan Mansion Apartments',
      typeId: 1,
      rating: 4.7,
      price: 160,
      imageUrls: ['/assets/images/1-3-1.jpg', '/assets/images/1-3-2.jpg'],
      description: 'Luxurious apartments located in a bustling metropolis, featuring top-notch amenities and proximity to entertainment hubs.',
      amenities: ['Luxury Furnishings', 'High-Speed Wi-Fi', 'Fitness Center', 'Parking', '24/7 Security', 'Pet-Friendly'],
    },
    {
      id: 10,
      name: 'Forest Haven Camping',
      typeId: 3,
      rating: 4.5,
      price: 50,
      imageUrls: ['/assets/images/3-3-1.jpg', '/assets/images/3-3-2.jpg', '/assets/images/3-3-3.jpg'],
      description: 'A beautiful camping site surrounded by dense foliage, offering solitude and a host of outdoor activities.',
      amenities: ['Fire Pit', 'Nature Trails', 'Picnic Area', 'Wildlife Viewing', 'Restrooms', 'Camping Essentials'],
    },
    {
      id: 11,
      name: 'Tropical Bliss Resort',
      typeId: 2,
      rating: 4.9,
      price: 350,
      imageUrls: ['/assets/images/2-3-1.jpg', '/assets/images/2-3-2.jpg', '/assets/images/2-3-3.jpg'],
      description: 'An exquisite resort located on a secluded island, featuring private beaches, spa services, and gourmet dining.',
      amenities: ['Private Beach', 'Spa Services', 'Fine Dining', 'Water Sports', 'Fitness Center', 'Free Wi-Fi'],
    },
    {
      id: 12,
      name: 'Skyline Amusement Park',
      typeId: 4,
      rating: 4.4,
      price: 95,
      imageUrls: ['/assets/images/4-3-1.jpg', '/assets/images/4-3-2.jpg', '/assets/images/4-3-3.jpg'],
      description: 'A dynamic amusement park with roller coasters, live shows, and interactive attractions for an exhilarating experience.',
      amenities: ['Roller Coasters', 'Live Shows', 'Food Stalls', 'ATMs', 'First Aid', 'Lost & Found'],
    }
  ],
};
