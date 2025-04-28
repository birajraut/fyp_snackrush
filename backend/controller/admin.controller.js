const { adminRestaurantListService, adminRestaurantUpdateService, adminDashboardService } = require("../service/admin.service");

const adminRestaurantList = async (req, res, next) => {
    try {
        const { status } = req.query;
        const resp = await adminRestaurantListService(status);
        res.json({
            result: resp
        });
    } catch (error) {
        next(error);
    }
};

const adminRestaurantUpdate = async (req, res, next) => {
    try {
        const { status, restaurant_id } = req.body;
        const resp = await adminRestaurantUpdateService(status, restaurant_id);
        res.json({
            result: resp
        });
    } catch (error) {
        next(error);
    }
};

const adminDashboard = async (req, res, next) => {
    try {
        const resp = await adminDashboardService();
        res.json({
            result: resp
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { adminRestaurantList, adminRestaurantUpdate, adminDashboard };
