import mongoose from 'mongoose';

const IntroductionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
},
{timestamps:true});

export default mongoose.models.Introduction || mongoose.model('Introduction', IntroductionSchema);
