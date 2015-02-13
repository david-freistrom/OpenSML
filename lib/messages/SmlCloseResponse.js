function SmlCloseResponse(){
	this.globalSignature = undefined;
};

SmlCloseResponse.prototype.getGlobalSignature = function getGlobalSignature(){
	return this.globalSignature;
};

SmlCloseResponse.prototype.setGlobalSignature = function setGlobalSignature(value){
	this.globalSignature = value;
};

SmlCloseResponse.prototype.toString = function toString(){
	var str = "";
	str += "Global Signature: "+this.globalSignature+"\n";
	return str;
};

SmlCloseResponse.prototype.write = function write(buffer){
};

SmlCloseResponse.parse = function parse(buffer){
	
	if(buffer.readTLField()==0x07,0x01){
		var smlCloseResponse = new SmlCloseResponse();
		smlCloseResponse.setGlobalSignature(buffer.readOctetString());
		return smlCloseResponse;
	} else {
		throw new Error("Unknown TL-Field for SmlCloseResponse!");
	}
};

module.exports = SmlCloseResponse;