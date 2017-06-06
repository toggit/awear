var Report = require('../models/report');

module.exports.getReports = function (req, res) {

	var data = req.body;
	var beginDate = new Date(data.date);
	var endDate = new Date(data.date);
	endDate.setHours(beginDate.getHours() + 2);

	// console.log("beginDate: " + beginDate + "endDate: " + endDate);

	Report.find({ time: { $gte: beginDate, $lte: endDate } }, function (err, result) {
		if (err) {
			res.json(err);
		} else {
			// console.log("result: "+result)
			res.json(result);
		}
	});
}