function SmlPublicCloseRequest(){
	this.globalSignature = undefined;
};

SmlPublicCloseRequest.prototype.getGlobalSignature = function getGlobalSignature(){
	return this.globalSignature;
};

SmlPublicCloseRequest.prototype.setGlobalSignature = function setGlobalSignature(value){
	this.globalSignature = value;
};

SmlPublicCloseRequest.prototype.write = function write(buffer){
	
};

SmlPublicCloseRequest.prototype.toString = function toString(){
	var str = "";
	str += "Global Signature: "+this.globalSignature+"\n";
	return str;
};

SmlPublicCloseRequest.parse = function parse(buffer){
	if(buffer.readTLField()==0x07,0x01){
		var smlPublicCloseRequest = new SmlPublicCloseRequest();
		smlPublicCloseRequest.setGlobalSignature(buffer.readOctetString());
		return smlPublicCloseRequest;
	} else {
		throw new Error("Unknown TL-Field for SmlPublicCloseRequest!");
	}
};

module.exports = SmlPublicCloseRequest;