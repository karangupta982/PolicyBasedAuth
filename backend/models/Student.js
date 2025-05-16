import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher', 
      
    },
    enrollmentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Student', StudentSchema);
