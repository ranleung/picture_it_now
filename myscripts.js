
// Changing Unix Time to Readable Time
var timeConverter = function(unix_timestamp) {
	var date = new Date(unix_timestamp*1000);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var formattedTime = hours + ':' + minutes;

	return formattedTime;
}






module.exports = timeConverter