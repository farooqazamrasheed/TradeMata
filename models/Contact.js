import mongoose from 'mongoose';

const ContactFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
},
{timestamps:true});

export default mongoose.models.ContactForm || mongoose.model('ContactForm', ContactFormSchema);
