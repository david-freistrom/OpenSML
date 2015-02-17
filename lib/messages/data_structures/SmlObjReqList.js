function SmlObjReqList(){
	this.listEntries = [];
};

SmlObjReqList.prototype.write = function write(buffer){
	
};

SmlObjReqList.prototype.addListEntry = function addListEntry(value){
	this.listEntries[this.listEntries.length]=value;
};

SmlObjReqList.prototype.toString = function toString(){	
	var str = "[\n";
	for(listEntry in this.listEntries){
		str += this.listEntries[listEntry].toString()+", \n";
	}
	
	str+="]";
	return str;
}

SmlObjReqList.parse = function parse(buffer){
	
	var smlObjReqList = new SmlObjReqList();
	var tlField = buffer.readTLField();
	
	if(tlField.type!=0x07){
		throw new Error("Unknown TL-Field for SmlObjReqList!");
	}
	
	for(var i=0; i<tlField.length; i++){
		smlObjReqList.addListEntry(buffer.readOctedString());
	}
	
	return smlObjReqList;
	
};

module.exports = SmlObjReqList;