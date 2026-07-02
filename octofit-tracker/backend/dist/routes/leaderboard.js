"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboardRouter = (0, express_1.Router)();
leaderboardRouter.get('/', (_req, res) => {
    res.json({
        route: '/api/leaderboard/',
        message: 'Leaderboard endpoint is ready.',
    });
});
exports.default = leaderboardRouter;
