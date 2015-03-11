SmlPeriodListEntry = require('./SmlPeriodListEntry');
SmlTupelEntry = require('./SmlTupelEntry');
SmlTime = require('./SmlTime');
SmlTreeList = require('./SmlTreeList');

function SmlTree(){
	this.parameterName = undefined;
	this.parameterValue = undefined;
	this.childList = undefined;
};

SmlTree.prototype.getParameterName = function getParameterName(){
	return this.parameterName;
};

SmlTree.prototype.setParameterName = function setParameterName(value){
	this.parameterName = value;
};

SmlTree.prototype.getParameterValue = function getParameterValue(){
	return this.parameterValue;
};

SmlTree.prototype.setParameterValue = function setParameterValue(value){
	this.parameterValue = value;
};

SmlTree.prototype.getChildList = function getChildList(){
	return this.childList;
};

SmlTree.prototype.setChildList = function setChildList(value){
	this.childList = value;
};

SmlTree.prototype.write = function write(buffer){
	
};

SmlTree.prototype.toString = function toString(){
	var str = "";
	str += "\t\t\t\tParameter-Name: "+this.parameterName.toString('hex')+"\n";
	if(this.parameterValue!=undefined){
		str += "\t\t\t\tParameter-Value: "+this.parameterValue.toString()+"\n";
	}
	if(this.childList!=undefined){
		str += "\t\t\t\tChild-List: "+this.childList.toString()+"\n";
	}
	return str;
};

SmlTree.parse = function parse(buffer){
	var tlField =  buffer.readTLField();
	if(tlField.type==0x07 && tlField.length==0x03){
		var smlTree = new SmlTree();
		smlTree.setParameterName(buffer.readOctetString());
				
		var tlField = buffer.readTLField();
		
		// OPTIONAL
		if(tlField.type==0x00 && tlField.length==0x01){
			smlTree.setParameterValue(undefined);
		} else {
			var choice = buffer.readUnsigned();	
			if(choice==0x01){
				smlTree.setParameterValue(buffer.readSmlValue());
			} else if(choice==0x02){
				smlTree.setParameterValue(SmlPeriodListEntry.parse(buffer));
			} else if(choice==0x03){
				smlTree.setParameterValue(SmlTupelEntry.parse(buffer));
			} else if(choice==0x04){
				smlTree.setParameterValue(SmlTime.parse(buffer));
			}
		}
	
		smlTree.setChildList(SmlTreeList.parse(buffer));
		return smlTree;
	} else {
		throw new Error("Unknown TL-Field for SmlTree!");
	}
};

module.exports = SmlTree;