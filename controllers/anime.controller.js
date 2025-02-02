const axios = require("axios");
const config = require("../config/config");
const AnimeModel = require("../models/anime.model");
const response = require("../utils/response.util");
const SearchHistoryModel = require("../models/search.history.model");

const AnimeController = {
    // Get anime list with search and filter
    getAnimes: async (req, res) => {
        try {
            const { q, type, status, rating, genre, page = 1 } = req.query;
            const params = new URLSearchParams({ page });

            if (q) params.append("q", q);
            if (type) params.append("type", type);
            if (status) params.append("status", status);
            if (rating) params.append("rating", rating);
            if (genre) params.append("genre", genre);

            const { data } = await axios.get(
                `${config.jikanBaseUrl}/anime?${params}`
            );

            if (q) {
                await SearchHistoryModel.create(req.userId, null, q);
            }

            response.success(res, data);
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to fetch animes");
        }
    },

    // Get single anime details
    getAnimeById: async (req, res) => {
        try {
            const { id } = req.params;
            const { data } = await axios.get(
                `${config.jikanBaseUrl}/anime/${id}/full`
            );

            response.success(res, data);
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to fetch anime details");
        }
    },

    // Get trending anime
    getTrending: async (req, res) => {
        try {
            const { data } = await axios.get(
                `${config.jikanBaseUrl}/top/anime`
            );
            response.success(res, data);
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to fetch trending anime");
        }
    },

    // Get seasonal anime
    getSeasonal: async (req, res) => {
        try {
            const { data } = await axios.get(
                `${config.jikanBaseUrl}/seasons/now`
            );
            response.success(res, data);
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to fetch seasonal anime");
        }
    },

    // Get upcoming anime
    getUpcoming: async (req, res) => {
        try {
            const { data } = await axios.get(
                `${config.jikanBaseUrl}/seasons/upcoming`
            );
            response.success(res, data);
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to fetch upcoming anime");
        }
    },
};

module.exports = AnimeController;
