"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    equipment: [{ type: String, trim: true }],
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    tags: [{ type: String, trim: true }],
}, { timestamps: true });
const WorkoutModel = (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = WorkoutModel;
