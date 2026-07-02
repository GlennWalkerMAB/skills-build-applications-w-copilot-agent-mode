import { Schema, model, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: {
      type: String,
      required: true,
      enum: ['Run', 'Cycling', 'Strength', 'Yoga', 'HIIT', 'Swimming', 'Walk'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, min: 0 },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export type Activity = InferSchemaType<typeof activitySchema>;

const ActivityModel = model('Activity', activitySchema);
export default ActivityModel;
