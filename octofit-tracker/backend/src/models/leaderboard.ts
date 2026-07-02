import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true, enum: ['daily', 'weekly', 'monthly'] },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export type Leaderboard = InferSchemaType<typeof leaderboardSchema>;

const LeaderboardModel = model('Leaderboard', leaderboardSchema);
export default LeaderboardModel;
