"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    period: { type: String, required: true, enum: ['daily', 'weekly', 'monthly'] },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { timestamps: true });
const LeaderboardModel = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.default = LeaderboardModel;
