"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const leaderboardRouter = (0, express_1.Router)();
leaderboardRouter.get('/', async (_req, res) => {
    try {
        const leaderboard = await models_1.LeaderboardModel.find()
            .populate('team', 'name city totalPoints')
            .sort({ period: 1, rank: 1 })
            .lean();
        res.json({
            route: '/api/leaderboard/',
            count: leaderboard.length,
            data: leaderboard,
        });
    }
    catch (error) {
        res.status(500).json({
            route: '/api/leaderboard/',
            error: 'Failed to load leaderboard entries.',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.default = leaderboardRouter;
