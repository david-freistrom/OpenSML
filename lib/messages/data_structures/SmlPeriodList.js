/*!
 * OpenSML
 * Copyright(c) 2014-2015 D. Spautz (d.spautz@web.de)
 * MIT Licensed
 */

var SmlPeriodListEntry = require('./SmlPeriodListEntry');
var Constants = require('../../Constants');

function SmlPeriodList(){
	this.periodListEntries = [];
}

SmlPeriodList.prototype.addPeriodListEntry = function addPeriodListEntry(value){
	this.periodListEntries[this.periodListEntries.length]=value;
};

SmlPeriodList.prototype.getPeriodListEntries = function getPeriodListEntries(){
	return this.periodListEntries;
};

SmlPeriodList.prototype.getSize = function getSize(){
	var size = 1;
	for(var periodListEntry in this.periodListEntries){
		size += this.periodListEntries[periodListEntry].getSize();
	}
	return size;
};

SmlPeriodList.prototype.write = function write(buffer){
	buffer.writeUInt8(0x70+this.periodListEntries.length); // SEQUENZ
	for(var periodListEntry in this.periodListEntries){
		this.periodListEntries[periodListEntry].write(buffer);
	}
};

SmlPeriodList.prototype.toString = function toString(){
	var str = "[\n";
	for(var periodListEntry in this.periodListEntries){
		str += this.periodListEntries[periodListEntry].toString()+", \n";
	}

	str+="\t\t\t]";
	return str;
};

SmlPeriodList.parse = function parse(buffer){

	var smlPeriodList = new SmlPeriodList();
	var tlField = buffer.readTLField();

	if(tlField.type!=0x07){
		throw new Error("Unknown TL-Field for SmlPeriodList!");
	}

	for(var i=0; i<tlField.length; i++){
		smlPeriodList.addPeriodListEntry(SmlPeriodListEntry.parse(buffer));
	}

	return smlPeriodList;

};

module.exports = SmlPeriodList;
