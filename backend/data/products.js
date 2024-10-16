const products = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image:
      'https://i5.walmartimages.com/seo/Apple-AirPods-with-Charging-Case-2nd-Generation_8540ab4f-8062-48d0-9133-323a99ed921d.fb43fa09a0faef3f9495feece1397f8d.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Portable Audio',
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image:
      'https://i5.walmartimages.com/seo/Walmart-Family-Mobile-Apple-iPhone-11-64GB-4GB-RAM-Black-Prepaid-Smartphone_6b298bb9-7800-41f9-b192-ea57f250afd4_1.1c8d73985dc4fb3cc911ffaa19a874c1.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: 'Cell Phones',
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Canon EOS 80D DSLR Camera',
    image:
      'https://i5.walmartimages.com/seo/Canon-EOS-80D-DSLR-Camera-with-18-55mm-Lens_07c93291-c076-4c80-8601-17851f26638c.91aa7d65b8196325549175e881a3efe5.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Canon',
    category: 'Cameras',
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image:
      'https://i5.walmartimages.com/asr/d99a90a0-c846-4be9-9f39-833ebc105677_1.47536514296aba8a0bb1706a0c9c3228.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Consoles',
    price: 399.99,
    countInStock: 11,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Sony Playstation 5',
    image:
      'https://i5.walmartimages.com/seo/Sony-PlayStation-5-Gaming-Console_b29e7500-cac2-4d1f-b4aa-5e0ebb3de124.c0b04249d968e2c1e5d25799b96ee0e3.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Consoles',
    price: 649.99,
    countInStock: 45,
    rating: 5,
    numReviews: 36,
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image:
      'https://i5.walmartimages.com/seo/Used-Logitech-G502-X-LIGHTSPEED-Wireless-mouse-with-LIGHTFORCE-hybrid-optical-mechanical-switches-HERO-25K-gaming-sensor-White_b30b19f5-6e0c-4243-af4b-1a1b80fcf106.3ff9acc60edb750033156aad010f080c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Appliances',
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: 'Logitech Slim Wireless Keyboard and Mouse',
    image:
      'https://i5.walmartimages.com/seo/Logitech-Slim-Wireless-Keyboard-Mouse-Combo-Low-Profile-Compact-Layout-Ultra-Quiet-Operation-2-4-GHz-USB-Receiver-Plug-Play-Connectivity-Long-Battery_68135e6a-bfa0-42b6-b962-aaa43b10f5e1.08574cf7f0cc21a8c18d598d922da1bb.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'Own your space with Logitech Slim Wireless Combo – an ultra-thin and design-forward keyboard and mouse duo perfect for getting things done efficiently and quietly, even in the tightest desk spaces.',
    brand: 'Logitech',
    category: 'Appliances',
    price: 79.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 10,
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image:
      'https://i5.walmartimages.com/seo/Blue-Turquoise-Vinyl-Decal-Skin-Compatible-Amazon-Echo-Dot-3rd-Generation-Alexa-Decorations-Your-Smart-Home-Speakers-great-accessories-gift-mom-dad-b_ea2233f8-bcef-4e0a-b7d9-da55b444d2e5_1.ff2a1011d18fcdda40445beb90c20d95.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Portable Audio',
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    name: '2K Resolution Wi-Fi Video Doorbell Camera',
    image:
      'https://i5.walmartimages.com/seo/Anker-eufy-Security-2K-Resolution-Wi-Fi-Video-Doorbell-Camera-No-Monthly-Fees-Requires-Existing-Doorbell-Wires_3ceea56c-3a4c-4e53-a59b-d104f3e1f1fd.7002c4a4503bcc9a6f56a1dc85f4ca33.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      "Get instant alerts for anyone who approaches, even if they don't press the doorbell. Interact with visitors by talking in real time or via pre-set responses",
    brand: 'Amazon',
    category: 'Smart Home',
    price: 99.99,
    countInStock: 10,
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'SAMSUNG 55” Class DU7200B Crystal UHD 4K Smart TV',
    image:
      'https://i5.walmartimages.com/seo/SAMSUNG-55-Class-DU7200B-Crystal-UHD-4K-Smart-TV-UN55DU7200BXZA-2024_891102a4-7ead-43bb-b972-cf8e6f8acbc2.7a23d9f97bf2e3859ce90ec27e06f838.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'PurColor-See a wide spectrum of colors than traditional RGB models with PurColor. From green turf to an amazing sunset, you’ll enjoy true to life picture quality with our innovative color technology.',
    brand: 'Samsung',
    category: 'TV',
    price: 998.99,
    countInStock: 20,
    rating: 5,
    numReviews: 17,
  },
  {
    name: '10.9-inch iPad Air Wi-Fi 256GB - Blue',
    image:
      'https://i5.walmartimages.com/seo/2022-Apple-10-9-inch-iPad-Air-Wi-Fi-256GB-Blue-5th-Generation_5359da95-c591-4175-8c9c-f270964ba5ec.7dd7fa7870d360f51aca6c619b8d6a10.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'Pad Air. With an immersive 10.9-inch Liquid Retina display. The breakthrough Apple M1 chip delivers faster performance, making iPad Air a creative and mobile gaming powerhouse. Featuring Touch ID, advanced cameras, blazing-fast 5G2 and Wi-Fi 6, USB-C, and support for Magic Keyboard and Apple Pencil (2nd generation).',
    brand: 'Apple',
    category: 'Tablets',
    price: 699.99,
    countInStock: 20,
    rating: 4,
    numReviews: 2,
  },
  {
    name: 'HP Victus 15.6 inch FHD IPS 144Hz Gaming Laptop',
    image:
      'https://i5.walmartimages.com/seo/HP-Victus-15-6-inch-FHD-144Hz-Gaming-Laptop-AMD-Ryzen-5-8645HS-NVIDIA-GeForce-RTX-4050-8GB-DDR4-512GB-SSD-Mica-Silver-2024_04abf048-d9d8-4116-a0bf-68803329aa55.cffd7bcccd71823b93806434d2d23b60.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'The Victus 15.6" Gaming Laptop is packed with the power of a desktop to keep up with the biggest games. You\'re ready to roll with a top-of-the-line processing AMD CPU and NVIDIA GeForce RTX graphics, with OMEN Gaming Hub helping to push the performance of both even farther. The updated thermal design keeps everything chill from max power gaming to after hours streaming. Open up your game with a much bigger touchpad, integrated keyboard and an HD Camera that features Temporal Noise Reduction for that crisp clarity on all your streams or calls.',
    brand: 'HP',
    category: 'Computers',
    price: 979.99,
    countInStock: 30,
    rating: 4.5,
    numReviews: 6,
  },
  {
    name: 'HP 15.6 inch Laptop Intel Core i5-1235U 8GB',
    image:
      'https://i5.walmartimages.com/seo/HP-15-6-inch-Laptop-Intel-Core-i5-1235U-8GB-RAM-256GB-SSD-Spruce-Blue_c1be9cbf-ec85-4af6-ac21-4a9323c3c5bd.004dea42970dbe0b966e65e36038bd9b.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'Designed to keep you productive and entertained from anywhere, the HP 15.6 inch Laptop PC combines long lasting battery life with a thin and portable, micro-edge bezel design. With a thin and light design, take this PC anywhere. ',
    brand: 'HP',
    category: 'Computers',
    price: 599.99,
    countInStock: 50,
    rating: 4,
    numReviews: 14,
  },
  {
    name: 'Apple Watch Series 9',
    image:
      'https://i5.walmartimages.com/seo/Apple-Watch-Series-9-GPS-45mm-Midnight-Aluminum-Case-with-Midnight-Sport-Loop-Fitness-Tracker-ECG-Apps-Always-On-Retina-Display-Water-Resistant_eba09acb-25c2-46d0-b1ec-8f13dff85685.ae56c72f9bf6145a5ba6aa127eeb0845.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      "Apple Watch Series 9. It's the ultimate device for a healthy life.Smarter. Brighter. Mightier. Measure all the ways you move. Stay moving, stay motivated. Powerful sensors, advanced health features.Apple Watch Series 9 helps you stay connected, active, healthy, and safe.",
    brand: 'Apple',
    category: 'Wearable Technology',
    price: 329.99,
    countInStock: 10,
    rating: 2.5,
    numReviews: 14,
  },
  {
    name: 'Apple iPhone 15 Pro Max 256GB',
    image:
      'https://i5.walmartimages.com/seo/AT-T-Apple-iPhone-15-Pro-Max-256GB-Natural-Titanium_43b58742-b6ad-491a-a795-e6c2eb6bcc6f.d6fa026332e1941b129f607c592844ab.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'iPhone 15 Pro Max. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    brand: 'Apple',
    category: 'Cell Phones',
    price: 1249.99,
    countInStock: 100,
    rating: 4.5,
    numReviews: 92,
  },
  {
    name: 'Apple MacBook Air 13.3',
    image:
      'https://i5.walmartimages.com/seo/Apple-MacBook-Air-13-3-inch-Laptop-Space-Gray-M1-Chip-8GB-RAM-256GB-storage_af1d4133-6de9-4bdc-b1c6-1ca8bd0af7a0.c0eb74c31b2cb05df4ed11124d0e255b.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      "Introducing The 13-inch MacBook Air with the Apple M1 chip is incredibly thin and light with a silent fanless design. It delivers remarkable performance and up to 18 hours of battery life. And it has a beautiful Retina display for super sharp text and vibrant colors. Amazing performance, Unbeatable price. It's a laptop you’re going to love!",
    brand: 'Apple',
    category: 'Computers',
    price: 699.99,
    countInStock: 30,
    rating: 4,
    numReviews: 31,
  },
  {
    name: 'Xbox Series X',
    image:
      'https://i5.walmartimages.com/seo/Xbox-Series-X-Video-Game-Console-Black_be5e36b4-85c3-4679-9640-3cd289996c37.293ada929e92793093a66f3912532372.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'Own the timeless original style of the Xbox Series X in Carbon Black, complete with 1TB of SSD storage.',
    brand: 'Xbox',
    category: 'Consoles',
    price: 499.99,
    countInStock: 20,
    rating: 4,
    numReviews: 14,
  },
  {
    name: 'Xbox Series S',
    image:
      'https://i5.walmartimages.com/seo/Xbox-Series-S-Console_8a3f1de5-ddc3-4b48-a5cf-0c5ce0dfae59.f3dd98cd08319e4011cb9c7e1a663fd8.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'XBOX SERIES S: The best value in gaming. Experience next-gen speed and performance at a great price with Xbox Series S featuring a 512GB custom SSD.',
    brand: 'Xbox',
    category: 'Consoles',
    price: 299.99,
    countInStock: 6,
    rating: 4,
    numReviews: 33,
  },
  {
    name: 'Apple iPad Mini Wi-Fi 64GB - Space Gray',
    image:
      'https://i5.walmartimages.com/seo/2021-Apple-iPad-Mini-Wi-Fi-64GB-Space-Gray-6th-Generation_ee981dec-2548-4103-8a7c-b11648930e3c.96fdacceec2cbe4b26283e8d687e788a.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'iPad mini. Featuring an all-screen design with an 8.3-inch Liquid Retina display. Powerful A15 Bionic chip with Neural Engine. A 12MP Ultra Wide front camera with Center Stage. USB-C connectivity. Ultrafast 5G. Take notes, mark up documents, or capture your biggest ideas with Apple Pencil (2nd generation) that attaches magnetically and charges wirelessly.',
    brand: 'Apple',
    category: 'Tablets',
    price: 499.99,
    countInStock: 14,
    rating: 3.5,
    numReviews: 7,
  },
  {
    name: 'Philips 32" Class HD (720P) Smart Roku Borderless LED TV',
    image:
      'https://i5.walmartimages.com/seo/Philips-32-Class-HD-720P-Smart-Roku-Borderless-LED-TV-32PFL6452-F7-New_1dcfc9bd-7805-4aa6-b176-5794aa6dcb9a.6e45760de84db6f7ae1983f60a39da10.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    description:
      'Deck out your entertainment room or even your bedroom with this new Philips 32" Class HD (720P) Smart Roku Borderless TV.  Roku TV makes streaming a breeze, so you\'ll always have your favorite show at your fingertips.',
    brand: 'Philips',
    category: 'TV',
    price: 168.99,
    countInStock: 50,
    rating: 3,
    numReviews: 10,
  },
];

export default products;
