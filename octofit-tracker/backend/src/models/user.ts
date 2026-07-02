import { Schema, model, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    level: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    weeklyGoalMinutes: { type: Number, required: true, min: 0 },
    totalPoints: { type: Number, required: true, min: 0, default: 0 },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;

const UserModel = model('User', userSchema);
export default UserModel;
