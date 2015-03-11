function SmlPublicCloseResponse(){
	this.globalSignature = undefined;
};

SmlPublicCloseResponse.prototype.getGlobalSignature = function getGlobalSignature(){
	return this.globalSignature;
};

SmlPublicCloseResponse.prototype.setGlobalSignature = function setGlobalSignature(value){
	this.globalSignature = value;
};

SmlPublicCloseResponse.prototype.toString = function toString(){
	var str = "\t\tSmlPublicCloseResponse\n";
	str += "\t\t\tGlobal Signature: "+this.globalSignature+"\n";
	return str;
};

SmlPublicCloseResponse.prototype.write = function write(buffer){
};

SmlPublicCloseResponse.parse = function parse(buffer){
	
	if(buffer.readTLField()==0x07,0x01){
		var smlPublicCloseResponse = new SmlPublicCloseResponse();
		smlPublicCloseResponse.setGlobalSignature(buffer.readOctetString());
		return smlPublicCloseResponse;
	} else {
		throw new Error("Unknown TL-Field for SmlPublicCloseResponse!");
	}
};

module.exports = SmlPublicCloseResponse;