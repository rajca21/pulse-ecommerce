import dotenv from 'dotenv';
import users from './users.js';
import brands from './brands.js';
import categories from './categories.js';
import products from './products.js';
import User from '../models/User.model.js';
import Brand from '../models/Brand.model.js';
import Category from '../models/Category.model.js';
import Product from '../models/Product.model.js';
import Order from '../models/Order.model.js';
import { connectDB } from '../config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Brand.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const createdBrands = await Brand.insertMany(brands);
    const appleBrand = createdBrands[0]._id;
    const sonyBrand = createdBrands[1]._id;
    const canonBrand = createdBrands[2]._id;
    const logitechBrand = createdBrands[3]._id;
    const amazonBrand = createdBrands[4]._id;
    const windowsBrand = createdBrands[5]._id;
    const hpBrand = createdBrands[6]._id;
    const samsungBrand = createdBrands[7]._id;
    const xboxBrand = createdBrands[8]._id;
    const philipsBrand = createdBrands[9]._id;

    const createdCategories = await Category.insertMany(categories);
    const smartHomeCat = createdCategories[0]._id;
    const tvCat = createdCategories[1]._id;
    const tabletsCat = createdCategories[2]._id;
    const computersCat = createdCategories[3]._id;
    const wearableTechCat = createdCategories[4]._id;
    const camerasCat = createdCategories[5]._id;
    const consolesCat = createdCategories[6]._id;
    const phonesCat = createdCategories[7]._id;
    const portableAudioCat = createdCategories[8]._id;
    const appliancesCat = createdCategories[9]._id;

    const sampleProducts = products.map((product) => {
      if (product.brand === 'Apple') {
        product.brand = appleBrand;
      } else if (product.brand === 'Sony') {
        product.brand = sonyBrand;
      } else if (product.brand === 'Canon') {
        product.brand = canonBrand;
      } else if (product.brand === 'Logitech') {
        product.brand = logitechBrand;
      } else if (product.brand === 'Amazon') {
        product.brand = amazonBrand;
      } else if (product.brand === 'Windows') {
        product.brand = windowsBrand;
      } else if (product.brand === 'HP') {
        product.brand = hpBrand;
      } else if (product.brand === 'Samsung') {
        product.brand = samsungBrand;
      } else if (product.brand === 'Xbox') {
        product.brand = xboxBrand;
      } else if (product.brand === 'Philips') {
        product.brand = philipsBrand;
      } else {
        product.brand = null;
      }

      if (product.category === 'Smart Home') {
        product.category = smartHomeCat;
      } else if (product.category === 'TV') {
        product.category = tvCat;
      } else if (product.category === 'Tablets') {
        product.category = tabletsCat;
      } else if (product.category === 'Computers') {
        product.category = computersCat;
      } else if (product.category === 'Wearable Technology') {
        product.category = wearableTechCat;
      } else if (product.category === 'Cameras') {
        product.category = camerasCat;
      } else if (product.category === 'Consoles') {
        product.category = consolesCat;
      } else if (product.category === 'Cell Phones') {
        product.category = phonesCat;
      } else if (product.category === 'Portable Audio') {
        product.category = portableAudioCat;
      } else if (product.category === 'Appliances') {
        product.category = appliancesCat;
      } else {
        product.category = null;
      }

      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(
      'Something went wrong while seeding the database: ' + error.message
    );
    products.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Brand.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(
      'Something went wrong while destroying the data: ' + error.message
    );
    products.exit(1);
  }
};

// Calling the seeders
// importData -> node backend/data/seeder.js (npm run data:import)
// destroyData -> node backend/data/seeder.js -d (npm run data:destroy)
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
