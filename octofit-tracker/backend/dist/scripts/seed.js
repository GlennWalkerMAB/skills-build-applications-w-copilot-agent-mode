"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(MONGODB_URI);
    await Promise.all([
        models_1.ActivityModel.deleteMany({}),
        models_1.LeaderboardModel.deleteMany({}),
        models_1.WorkoutModel.deleteMany({}),
        models_1.UserModel.deleteMany({}),
        models_1.TeamModel.deleteMany({}),
    ]);
    const teams = await models_1.TeamModel.insertMany([
        {
            name: 'Velocity Vipers',
            city: 'Seattle',
            motto: 'Fast feet, strong minds',
            members: [],
            totalPoints: 0,
        },
        {
            name: 'Summit Striders',
            city: 'Denver',
            motto: 'Climb every challenge',
            members: [],
            totalPoints: 0,
        },
        {
            name: 'Bay Burners',
            city: 'San Francisco',
            motto: 'Stay steady, finish strong',
            members: [],
            totalPoints: 0,
        },
    ]);
    const users = await models_1.UserModel.insertMany([
        {
            fullName: 'Maya Brooks',
            email: 'maya.brooks@octofit.test',
            level: 'Advanced',
            weeklyGoalMinutes: 320,
            totalPoints: 890,
            team: teams[0]._id,
        },
        {
            fullName: 'Liam Chen',
            email: 'liam.chen@octofit.test',
            level: 'Intermediate',
            weeklyGoalMinutes: 240,
            totalPoints: 620,
            team: teams[0]._id,
        },
        {
            fullName: 'Aria Singh',
            email: 'aria.singh@octofit.test',
            level: 'Advanced',
            weeklyGoalMinutes: 300,
            totalPoints: 810,
            team: teams[1]._id,
        },
        {
            fullName: 'Noah Ramirez',
            email: 'noah.ramirez@octofit.test',
            level: 'Beginner',
            weeklyGoalMinutes: 180,
            totalPoints: 410,
            team: teams[1]._id,
        },
        {
            fullName: 'Ella Johnson',
            email: 'ella.johnson@octofit.test',
            level: 'Intermediate',
            weeklyGoalMinutes: 220,
            totalPoints: 540,
            team: teams[2]._id,
        },
        {
            fullName: 'Owen Patel',
            email: 'owen.patel@octofit.test',
            level: 'Advanced',
            weeklyGoalMinutes: 280,
            totalPoints: 760,
            team: teams[2]._id,
        },
    ]);
    await models_1.TeamModel.updateOne({ _id: teams[0]._id }, { members: [users[0]._id, users[1]._id], totalPoints: users[0].totalPoints + users[1].totalPoints });
    await models_1.TeamModel.updateOne({ _id: teams[1]._id }, { members: [users[2]._id, users[3]._id], totalPoints: users[2].totalPoints + users[3].totalPoints });
    await models_1.TeamModel.updateOne({ _id: teams[2]._id }, { members: [users[4]._id, users[5]._id], totalPoints: users[4].totalPoints + users[5].totalPoints });
    const now = new Date();
    await models_1.ActivityModel.insertMany([
        {
            user: users[0]._id,
            team: teams[0]._id,
            type: 'Run',
            durationMinutes: 48,
            caloriesBurned: 520,
            distanceKm: 9.6,
            performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 18),
        },
        {
            user: users[1]._id,
            team: teams[0]._id,
            type: 'Strength',
            durationMinutes: 55,
            caloriesBurned: 460,
            performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 22),
        },
        {
            user: users[2]._id,
            team: teams[1]._id,
            type: 'Cycling',
            durationMinutes: 62,
            caloriesBurned: 610,
            distanceKm: 23.1,
            performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 8),
        },
        {
            user: users[3]._id,
            team: teams[1]._id,
            type: 'Yoga',
            durationMinutes: 35,
            caloriesBurned: 180,
            performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 28),
        },
        {
            user: users[4]._id,
            team: teams[2]._id,
            type: 'Swimming',
            durationMinutes: 40,
            caloriesBurned: 430,
            distanceKm: 1.4,
            performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 15),
        },
        {
            user: users[5]._id,
            team: teams[2]._id,
            type: 'HIIT',
            durationMinutes: 30,
            caloriesBurned: 390,
            performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 5),
        },
    ]);
    await models_1.WorkoutModel.insertMany([
        {
            title: 'Power Ladder Circuit',
            focusArea: 'Full Body',
            difficulty: 'Advanced',
            durationMinutes: 45,
            equipment: ['Dumbbells', 'Kettlebell'],
            createdBy: users[0]._id,
            tags: ['strength', 'metabolic', 'team-challenge'],
        },
        {
            title: 'Tempo Endurance Builder',
            focusArea: 'Cardio',
            difficulty: 'Intermediate',
            durationMinutes: 38,
            equipment: ['Treadmill'],
            createdBy: users[2]._id,
            tags: ['running', 'stamina'],
        },
        {
            title: 'Mobility Reset Flow',
            focusArea: 'Mobility',
            difficulty: 'Beginner',
            durationMinutes: 25,
            equipment: ['Yoga Mat'],
            createdBy: users[3]._id,
            tags: ['recovery', 'flexibility'],
        },
        {
            title: 'Pool Sprint Intervals',
            focusArea: 'Conditioning',
            difficulty: 'Intermediate',
            durationMinutes: 32,
            equipment: ['Kickboard'],
            createdBy: users[4]._id,
            tags: ['swimming', 'intervals'],
        },
    ]);
    const refreshedTeams = await models_1.TeamModel.find().sort({ totalPoints: -1 }).lean();
    const weeklyLeaderboard = refreshedTeams.map((team, index) => ({
        period: 'weekly',
        team: team._id,
        score: team.totalPoints,
        rank: index + 1,
    }));
    const monthlyLeaderboard = refreshedTeams.map((team, index) => ({
        period: 'monthly',
        team: team._id,
        score: team.totalPoints + (3 - index) * 120,
        rank: index + 1,
    }));
    await models_1.LeaderboardModel.insertMany([...weeklyLeaderboard, ...monthlyLeaderboard]);
    const totals = {
        users: await models_1.UserModel.countDocuments(),
        teams: await models_1.TeamModel.countDocuments(),
        activities: await models_1.ActivityModel.countDocuments(),
        leaderboard: await models_1.LeaderboardModel.countDocuments(),
        workouts: await models_1.WorkoutModel.countDocuments(),
    };
    console.log('Seed complete:', totals);
}
seedDatabase()
    .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.disconnect();
});
