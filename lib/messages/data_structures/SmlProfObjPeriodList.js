var SmlProfObjPeriodListEntry = require('./SmlProfObjPeriodListEntry');

function SmlProfObjPeriodList(){
	this.listEntries = [];
};

SmlProfObjPeriodList.prototype.write = function write(buffer){
	
};

SmlProfObjPeriodList.prototype.addListEntry = function addListEntry(value){
	this.listEntries[this.listEntries.length]=value;
};

SmlProfObjPeriodList.prototype.toString = function toString(){	
	var str = "[\n";
	for(listEntry in this.listEntries){
		str += this.listEntries[listEntry].toString()+", \n";
	}
	
	str+="]";
	return str;
}

SmlProfObjPeriodList.parse = function parse(buffer){
	
	var smlProfObjPeriodList = new SmlProfObjPeriodList();
	var tlField = buffer.readTLField();
	
	if(tlField.type!=0x07){
		throw new Error("Unknown TL-Field for SmlProfObjPeriodList!");
	}
	
	for(var i=0; i<tlField.length; i++){
		smlProfObjPeriodList.addListEntry(SmlProfObjPeriodListEntry.parse(buffer));
	}
	
	return smlProfObjPeriodList;
	
};

module.exports = SmlProfObjPeriodList;