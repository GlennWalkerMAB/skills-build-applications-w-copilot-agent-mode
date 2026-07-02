import { Schema, model, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    equipment: [{ type: String, trim: true }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export type Workout = InferSchemaType<typeof workoutSchema>;

const WorkoutModel = model('Workout', workoutSchema);
export default WorkoutModel;
