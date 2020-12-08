const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PropertySchema = new Schema(
	{
		_id: String,
		UniversalID: Number,
		SOURCECO: String,
		DIVISION: String,
		LOB: String,
		ADDRESS1: String,
		ADMIN1: String,
		ADMIN1DESC: String,
		ADMIN2: Number,
		ADMIN2DESC: String,
		ADMIN3: Number,
		ADMIN3DESC: String,
		ADMIN4: String,
		ADMIN4DESC: String,
		ADMIN5: String,
		ADDRMATCH: String,
		ADDRMATCHCODE: Number,
		LATITUDE: Number,
		LONGITUDE: Number,
		NUMSTORIES: Number,
		AREA: Number,
		YEARBUILT: String,
		HUIND: String,
		HUCONSTDESC: String,
		OCCUPANCYDESC: String,
		DEDHU: Number,
		TOTLIM: Number,
		TIV: Number,
		PREMIUM: Number,
		GROSSLOSS: Number,
		Wildfire: String,
	},
	{ collection: "csvDBSample" }
);

module.exports = mongoose.model("Property", PropertySchema);
