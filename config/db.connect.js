// import { createClient } from '@supabase/supabase-js';
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const supabaseUrl = process.env.SUPER_BASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const connectMongooseDB = async () => {
  try {
    if (process.env.NODE_ENV === 'DEV') {
      const dbData = mongoose.connect(process.env.MONGO_LOCAL);
      console.log('MONGO Local DB connected👍!!!');
    } else {
      const dbData = mongoose.connect(process.env.MONGO_CLOUD);
      console.log('MONGO Cloud DB connected 👍!!!');
    }
  } catch (err) {
    console.log('Error in DB😒', err);
  }
};

module.exports = { supabase, connectMongooseDB };
