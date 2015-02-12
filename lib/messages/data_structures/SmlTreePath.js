function SmlTreePath(){
	this.pathEntries=[];
};

SmlTreePath.prototype.toString = function toString(){
	var str = "[";
	for(pathEntry in this.pathEntries){
		str += this.pathEntries.toString('hex')+", ";
	}
	str +="]"
	return str;
}

SmlTreePath.parse = function parse(buffer){
	var smlTreePath = new SmlTreePath();
	var tlField = buffer.readTLField();
		
	if(tlField.type!=0x07){
		throw new Error("Unknown TL-Field for SmlTreePath!");
	}
	
	for(var i=0; i<tlField.length; i++){
		smlTreePath.pathEntries[i]=buffer.readOctetString();
	}
	
	return smlTreePath;
};

module.exports = SmlTreePath;