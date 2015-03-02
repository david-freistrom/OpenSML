var SmlProfObjHeaderEntry = require('./SmlProfObjHeaderEntry');

function SmlProfObjHeaderList(){
	this.listEntries = [];
};

SmlProfObjHeaderList.prototype.write = function write(buffer){
	
};

SmlProfObjHeaderList.prototype.addListEntry = function addListEntry(value){
	this.listEntries[this.listEntries.length]=value;
};

SmlProfObjHeaderList.prototype.toString = function toString(){	
	var str = "[\n";
	for(listEntry in this.listEntries){
		str += this.listEntries[listEntry].toString()+", \n";
	}
	
	str+="]";
	return str;
}

SmlProfObjHeaderList.parse = function parse(buffer){
	
	var smlProfObjHeaderList = new SmlProfObjHeaderList();
	var tlField = buffer.readTLField();
	
	if(tlField.type!=0x07){
		throw new Error("Unknown TL-Field for SmlProfObjHeaderList!");
	}
	
	for(var i=0; i<tlField.length; i++){
		smlProfObjHeaderList.addListEntry(SmlProfObjHeaderEntry.parse(buffer));
	}
	
	return smlProfObjHeaderList;
	
};

module.exports = SmlProfObjHeaderList;