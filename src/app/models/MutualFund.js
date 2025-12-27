// models/MutualFund.js
import mongoose from 'mongoose';

const MutualFundSchema = new mongoose.Schema({
  schemeCode: { type: String, required: true, unique: true },
  schemeName: { type: String, required: true },
  fundType: String,
  category: String,
  nav: Number,
  lastUpdated: Date,
}, { timestamps: true });

const MutualFund = mongoose.models.MutualFund || mongoose.model('MutualFund', MutualFundSchema);
export default MutualFund;