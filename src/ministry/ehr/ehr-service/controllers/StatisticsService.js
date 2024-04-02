const { db } = require("../config/database");

class StatisticsService {
    async timeline(req, res){
        const sql = `SELECT DATE_FORMAT(date, '%Y-%m') AS date_key, COUNT(id) AS consultations FROM consultations WHERE date  GROUP BY date_key ORDER BY date_key;`;
        const sql2 = `SELECT DATE_FORMAT(date_entree, '%Y-%m') AS date_key, COUNT(id) AS hospitalisations FROM hospitalisations GROUP BY date_key ORDER BY date_key;`;
        const sql3 = `SELECT DATE_FORMAT(date, '%Y-%m') AS date_key, COUNT(id) AS interventions FROM interventions GROUP BY date_key ORDER BY date_key;`;

        const [[results1], [results2], [results3]] = await Promise.all([db.query(sql), db.query(sql2), db.query(sql3)]);
        console.log(results1)
        const results = [...results1, ...results2, ...results3].reduce((acc, item) => {
            const dateKey = item.date_key;
            if (!acc[dateKey]) {
                acc[dateKey] = {
                    consultations: 0,
                    hospitalisations: 0,
                    interventions: 0
                };
            }
            acc[dateKey].consultations += item.consultations || 0;
            acc[dateKey].hospitalisations += item.hospitalisations || 0;
            acc[dateKey].interventions += item.interventions || 0;
            return acc;
        }, {});
        return res.status(200).json(results)
    }
}

module.exports = new StatisticsService();