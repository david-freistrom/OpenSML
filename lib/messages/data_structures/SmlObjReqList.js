function SmlObjReqList(){
	this.listEntries = [];
};

SmlObjReqList.prototype.getSize = function getSize(){
	var size = 1;
	for(listEntries in this.listEntries){
		size += 1+this.listEntries[listEntrie].length;
	}
	return size;
};

SmlObjReqList.prototype.write = function write(buffer){
	buffer.writeUInt8(0x70+this.listEntries.length); // SEQUENZ
	for(listEntries in this.listEntries){
		buffer.writeOctetString(this.listEntries[listEntrie]);
	}
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