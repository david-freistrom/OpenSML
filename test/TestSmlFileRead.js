// Test for writing a SML-File
var chai = require('chai');
chai.use(require('chai-change'));
chai.use(require('sinon-chai'));
var sinon = require("sinon");

var expect = require("chai").expect;
var should = require('chai').should;

var sml = require('../index');

function runTest(testIndex) {
    var testResult = true;
    var smlFile = new sml.SmlFile();

    // STEP 1: Parse SML Telegram
    try {
        smlFile.parse(stream[testIndex]);
    }
    catch(err) {
        console.log(smlFile.toString());
        throw err;
        testResult = false;
    }

    // STEP 2a: Output Message
    var parsedFirst = smlFile.toString();
    console.log(parsedFirst);

    // STEP 2b: Check CRC-Check Status for SML-Messages and SML-File
    for(var msg in smlFile.messages){
        console.log("CRC-Check Msg "+msg+": "+smlFile.messages[msg].isValid());
	}
    console.log("CRC-Check File: "+smlFile.valid);
    console.log("");

    // STEP 3: Write Message back to an SML-Telegram and Compare
    var resBuffer=smlFile.write();
    var resHex=resBuffer.buffer.toString('hex');
    if (!compareMessages(resBuffer.buffer, stream[testIndex])) {
        console.log("WRITTEN BACK TO SML:");
        console.log(resHex);
        console.log("ORIGINALLY READ:");
        console.log(stream[testIndex].toString('hex'));
        process.exitCode = 1;
        if (testIndex !== 31 && testIndex !== 34) {
            testResult = false;
        }
    }
    else {
        // STEP 4a: Parse Written SML-Telegra back into a message
        console.log("REPARSING");
        var smlFile2 = new sml.SmlFile();
        smlFile2.parse(resBuffer.buffer);

        // STEP 4b: Check CRC-Check Status for SML-Messages and SML-File
        for(var msg2 in smlFile2.messages){
            console.log("CRC-Check Msg "+msg2+": "+smlFile2.messages[msg2].isValid());
    	}
        console.log("CRC-Check File: "+smlFile2.valid);
        console.log("");

        // STEP 5: Compare strings of Messages (only when both CRC message where valid)
        var parsedSecond = smlFile2.toString();
        if (smlFile.valid==smlFile2.valid && parsedFirst!=parsedSecond) {
            console.log("Parsed Messages differ!");
            //testResult = false;
        }
    }
    return testResult;
}

function compareMessages(buf1, buf2) {
    var length=(buf1.length>buf2.length)?buf1.length:buf2.length;
    var cnt_buf1=0;
    var cnt_buf2=0;
    var mismatch = false;
    do {
        if (buf1[cnt_buf1]!=buf2[cnt_buf2]) {
            if ((buf1[cnt_buf1]>0x61 && buf1[cnt_buf1]<=0x69) && (buf2[cnt_buf2]>0x61 && buf2[cnt_buf2]<=0x69)) {
                var ignore_length=buf1[cnt_buf1]-buf2[cnt_buf2]; // >0 means buf1 more digits then buf2, <0 other way
                if (ignore_length>0) {
                    for (var i=1;i<=ignore_length;i++) {
                        if (buf1[cnt_buf1+i]!==0x00) {
                            mismatch=true;
                            break;
                        }
                    }
                    if (!mismatch) {
                        cnt_buf1+=ignore_length;
                    }
                }
                else {
                    for (var i=1;i<=(-ignore_length);i++) {
                        if (buf2[cnt_buf2+i]!==0x00) {
                            mismatch=true;
                            break;
                        }
                    }
                    if (!mismatch) {
                        cnt_buf2+=(-ignore_length);
                    }
                }
                if (mismatch) break;
            }
            else if ((buf1[cnt_buf1]>0x51 && buf1[cnt_buf1]<=0x59) && (buf2[cnt_buf2]>0x51 && buf2[cnt_buf2]<=0x59)) {
                var ignore_length=buf1[cnt_buf1]-buf2[cnt_buf2]; // >0 means buf1 more digits then buf2, <0 other way
                if (ignore_length>0) {
                    for (var i=1;i<=ignore_length;i++) {
                        if (buf1[cnt_buf1+i]!==0x00) {
                            mismatch=true;
                            break;
                        }
                    }
                    if (!mismatch) {
                        cnt_buf1+=ignore_length;
                    }
                }
                else {
                    for (var i=1;i<=(-ignore_length);i++) {
                        if (buf2[cnt_buf2+i]!==0x00) {
                            mismatch=true;
                            break;
                        }
                    }
                    if (!mismatch) {
                        cnt_buf2+=(-ignore_length);
                    }
                }
                if (mismatch) break;
            }

            else if (buf1[cnt_buf1]===0x1b && buf2[cnt_buf2]===0x00) {
                // ignore different length of filler bytes at the end
                cnt_buf1-=1;
            }
            else if (buf2[cnt_buf2]===0x1b && buf1[cnt_buf1]===0x00) {
                // ignore different length of filler bytes at the end
                cnt_buf2-=1;
            }

            else if (buf1[cnt_buf1-1]===0x63 && buf2[cnt_buf2-1]===0x63 && buf1[cnt_buf1+2]===0x00 && buf2[cnt_buf2+2]===0x00) {
                // Message checksums can be different, so ignire them
                cnt_buf1+=1;
                cnt_buf2+=1;
            }
            else if (buf1[cnt_buf1-2]===0x63 && buf2[cnt_buf2-2]===0x63 && buf1[cnt_buf1+1]===0x00 && buf2[cnt_buf2+1]===0x00) {
                // Message checksums can be different, so ignire them
                cnt_buf1+=1;
                cnt_buf2+=1;
            }

            else {
                mismatch=true;
                break;
            }
        }
        cnt_buf1++;
        cnt_buf2++;
    } while (cnt_buf1<buf1.length-3 && cnt_buf2<buf2.length-3);
    if (mismatch) {
        console.log("MISMATCH on Pos "+cnt_buf1+" ("+buf1[cnt_buf1].toString(16)+") vs. "+cnt_buf2+" ("+buf2[cnt_buf2].toString(16)+")");
    }
    if (cnt_buf1!=buf1.length-3) {
        console.log("No MISMATH, Compare Ended Pos. "+cnt_buf1+" from "+buf1.length+" available on rewritten sml, ignoring rest");
    }
    if (cnt_buf2!=buf2.length-3) {
        console.log("No MISMATH, Compare Ended Pos. "+cnt_buf2+" from "+buf2.length+" available on original sml, ignoring rest");
    }
    return !mismatch;
}

var stream = [];
/*00*/stream.push(Buffer.from('76083534373132393062006200726301017601080500153b022e3908353437313238390a01a8153810780401020101631ab600', 'hex'));
/*01*/stream.push(Buffer.from("7608353437313239316200620072630401790a01a8153810780401027262026554e9f832620171078181c786180172620164944f8f6301807975070100000009ff62ff52000a01a8153810780401020175070100010800ff621e52ff5900000000000b8fb20175070100010801ff621e52ff5900000000000b8fb20175070100010802ff621e52ff5900000000000000000175070100100700ff621b52ff55000001c20175078181c78203ff62ff520004454d480175078181c78205ff62ff52008302097bd1b6e37d93f97c5c2fa1f385fabb84ed2465c8d3d5f14f021fa863929ef62c99f6b53993253fcf3de7c33167f717017507010000090b00620752006554e9f816017507810000090b00620752006493668e0101016358b500", 'hex'));
/*02*/stream.push(Buffer.from("7608353437313239316200620072630401790a01a8153810780401027262026554e9f832620171078181c786180172620164944f916301827975070100000009ff62ff52000a01a8153810780401020175070100010800ff621e52ff5900000000000b8fb30175070100010801ff621e52ff5900000000000b8fb30175070100010802ff621e52ff5900000000000000000175070100100700ff621b52ff55000001ed0175078181c78203ff62ff520004454d480175078181c78205ff62ff52008302097bd1b6e37d93f97c5c2fa1f385fabb84ed2465c8d3d5f14f021fa863929ef62c99f6b53993253fcf3de7c33167f717017507010000090b00620752006554e9f818017507810000090b00620752006493669201010163e80300", "hex"));
/*03*/stream.push(Buffer.from("7608353437313239316200620072630401790a01a8153810780401027262026554e9f832620171078181c786180172620164944f956301807975070100000009ff62ff52000a01a8153810780401020175070100010800ff621e52ff5900000000000b8fb30175070100010801ff621e52ff5900000000000b8fb30175070100010802ff621e52ff5900000000000000000175070100100700ff621b52ff55000001b80175078181c78203ff62ff520004454d480175078181c78205ff62ff52008302097bd1b6e37d93f97c5c2fa1f385fabb84ed2465c8d3d5f14f021fa863929ef62c99f6b53993253fcf3de7c33167f717017507010000090b00620752006554e9f81d017507810000090b0062075200649366960101016327b500", "hex"));
/*04*/stream.push(Buffer.from("7608353437313239316200620072630401790a01a8153810780401027262026554e9f832620171078181c786180172620164944f9a6301827975070100000009ff62ff52000a01a8153810780401020175070100010800ff621e52ff5900000000000b8fb40175070100010801ff621e52ff5900000000000b8fb40175070100010802ff621e52ff5900000000000000000175070100100700ff621b52ff55000001950175078181c78203ff62ff520004454d480175078181c78205ff62ff52008302097bd1b6e37d93f97c5c2fa1f385fabb84ed2465c8d3d5f14f021fa863929ef62c99f6b53993253fcf3de7c33167f717017507010000090b00620752006554e9f821017507810000090b00620752006493669a01010163a42000", "hex"));
/*05*/stream.push(Buffer.from("7608353437313239316200620072630401790a01a8153810780401027262026554e9f832620171078181c786180172620164944f9e6301807975070100000009ff62ff52000a01a8153810780401020175070100010800ff621e52ff5900000000000b8fb40175070100010801ff621e52ff5900000000000b8fb40175070100010802ff621e52ff5900000000000000000175070100100700ff621b52ff55000001920175078181c78203ff62ff520004454d480175078181c78205ff62ff52008302097bd1b6e37d93f97c5c2fa1f385fabb84ed2465c8d3d5f14f021fa863929ef62c99f6b53993253fcf3de7c33167f717017507010000090b00620752006554e9f825017507810000090b00620752006493669f0101016379ae00", "hex"));
/*06*/stream.push(Buffer.from("7608353437313239316200620072630401790a01a8153810780401027262026554e9f832620171078181c786180172620164944fa26301827975070100000009ff62ff52000a01a8153810780401020175070100010800ff621e52ff5900000000000b8fb50175070100010801ff621e52ff5900000000000b8fb50175070100010802ff621e52ff5900000000000000000175070100100700ff621b52ff55000001960175078181c78203ff62ff520004454d480175078181c78205ff62ff52008302097bd1b6e37d93f97c5c2fa1f385fabb84ed2465c8d3d5f14f021fa863929ef62c99f6b53993253fcf3de7c33167f717017507010000090b00620752006554e9f829017507810000090b0062075200649366a301010163f9a900", "hex"));
/*07*/stream.push(Buffer.from("7608353437313239316200620072630401790a01a8153810780401027262026554e9f832620171078181c786180172620164944fa76301807975070100000009ff62ff52000a01a8153810780401020175070100010800ff621e52ff5900000000000b8fb50175070100010801ff621e52ff5900000000000b8fb50175070100010802ff621e52ff5900000000000000000175070100100700ff621b52ff55000001a00175078181c78203ff62ff520004454d480175078181c78205ff62ff52008302097bd1b6e37d93f97c5c2fa1f385fabb84ed2465c8d3d5f14f021fa863929ef62c99f6b53993253fcf3de7c33167f717017507010000090b00620752006554e9f82e017507810000090b0062075200649366a701010163e18300", "hex"));
/*08*/stream.push(Buffer.from("1b1b1b1b010101017608353437313239326200620072630201710163baea000000001b1b1b1b1a0387ae", "hex"));
/*09*/stream.push(Buffer.from("1b1b1b1b01010101760f30313233343536373839306162636200620072650000010176010f30353030313533623032326533390a3531303135383838310c316261353539306166316172620265ffffffff620163ffff00760a35313031353838383362006200726500000401790d31626135353930616631616172620265ffffffff6500000000710a72677264676466676672620165ffffffff69407820000000000074750d303130303031303830306666621e52ff5304e401750d303130303031303830316666621e52ff5304e401750d303130303130303730306666621e52ff53020b01750d303130303031303830326666621e52ff5303da01010163000000760a35313031353838383462006200726500000201710163000000", "hex"));
/*10*/stream.push(Buffer.from("1b1b1b1b01010101760a34363034323731373662006200726302017101631763000000001b1b1b1b1a035bc5", "hex"));
/*11*/stream.push(Buffer.from("1b1b1b1b01010101760700190b4cbead6200620072630101760101070019063f3f8f0b0901454d48000041f045010163662d00760700190b4cbeae620062007263070177010b0901454d48000041f045070100620affff72620165063f2f357777078181c78203ff0101010104454d480177070100000009ff010101010b0901454d48000041f0450177070100010800ff6400018201621e52ff560009247a550177070100010801ff0101621e52ff560009247a550177070100010802ff0101621e52ff5600000000000177070100100700ff0101621b52ff55000016030177078181c78205ff0172620165063f2f3501018302e77ef33ea97bb6bba9bfa4fbd8b9f2ede51207b15acf6b98a237c21ca4982ee3ce18efe8438f1deba9d5c40eb68ae8f201010163574a00760700190b4cbeb16200620072630201710163d658000000001b1b1b1b1a03e566", "hex"));
/*12*/stream.push(Buffer.from("1B1B1B1B0101010176070014000011166200620072630101760101070014020F05B20B0901454D4800004B07FB01016395AB007607001400001117620062007263070177010B0901454D4800004B07FB070100620AFFFF72620165020F8F327777078181C78203FF0101010104454D480177070100000009FF010101010B0901454D4800004B07FB0177070100010800FF6400018201621E52FF56000360FBF90177070100010801FF0101621E52FF56000360FBF90177070100010802FF0101621E52FF5600000000000177070100100700FF0101621B52FF55000025E30177078181C78205FF0172620165020F8F3201018302AD3D0DD459EFE424D0E09BF2A5C0E061708272DE4A4BEEF0BAC48970EA499DC2ACAE60446354C2E16053A3FD18CF8EB001010163273F00760700140000111A62006200726302017101636B62000000001B1B1B1B1A033510", "hex"));
/*13*/stream.push(Buffer.from("1b1b1b1b01010101760700190b4cbead62006200726500000101760101070019063f3f8f0b0901454d48000041f045010163662d00760700190b4cbeae6200620072650000070177010b0901454d48000041f045070100620affff72620165063f2f357777078181c78203ff0101010104454d480177070100000009ff010101010b0901454d48000041f0450177070100010800ff650000018201621e52ff590000000009247a550177070100010801ff0101621e52ff590000000009247a550177070100010802ff0101621e52ff5900000000000000000177070100100700ff0101621b52ff55000016030177078181c78205ff0172620165063f2f3501018302e77ef33ea97bb6bba9bfa4fbd8b9f2ede51207b15acf6b98a237c21ca4982ee3ce18efe8438f1deba9d5c40eb68ae8f201010163574a00760700190b4cbeb162006200726500000201710163d658000000001b1b1b1b1a033fec", "hex")); // written by self from 11
/*14*/stream.push(Buffer.from("76074954413030316200620072630701770109313130323132333401726201654b8c03857677078181c78203ff01010101044954410177070100000000ff0101010105110212340177070100010800ff0101621e520055009d51c00177070100020800ff0101621e520055002e630101770701000f0700ff0101621b520055000000020177070100190700ff0101622152fd55000004b1010101636d6100", "hex"));
/*15*/stream.push(Buffer.from("1B1B1B1B010101017607000D000BB2E1620062007263010176010107000D04B5E64B0B06454D480102715466F50101633FB6007607000D000BB2E2620062007263070177010B06454D480102715466F5017262016504B5825E7777078181C78203FF0101010104454D480177070100000009FF010101010B06454D480102715466F50177070100010800FF63020001621E52FF560005083F1D0177070100010801FF0101621E52FF560001DB16240177070100010802FF0101621E52FF5600032D28F901770701000F0700FF0101621B52FF55000000000177078181C78205FF0101010183022D71B54A09ACC232221CE8C146CAAA4077F0DB516FC0E1F96D6931BA2509566133FB1D8EF519BF19B149790E864EEA46010101631097007607000D000BB2E362006200726302017101633CDD00001B1B1B1B1A011174", "hex"));
/*16*/stream.push(Buffer.from("1B1B1B1B010101017607001A000077EB620062007263010176010107001A000D27F90904039FC8DE57E96D010163D3DA007607001A000077EC620062007263070177010904039FC8DE57E96D0172620165000D098D7777078181C78203FF0101010104454D480177070100000009FF010101010904039FC8DE57E96D0177070100010800FF63020001621E52FF560000007F970177070100010801FF0101621E52FF5600000000000177070100010802FF0101621E52FF560000007F9701770701000F0700FF0101621B52FF55000000000177078181C78205FF0101010183022A8158E0A420044A5CAE4DAAEF0074EFBDFEC181AD29AE1DF2244F825802933848CED87C55EA25C355880F972610FF27010101633B1C007607001A000077EF6200620072630201710163FC37000000001B1B1B1B1A038113", "hex"));
/*17*/stream.push(Buffer.from("76083534373132393162006200726500000401790a01a8153810780401027262026554e9f832650000000171078181c78618017262016500944f8f6940780000000000007975070100000009ff62ff52000a01a8153810780401020175070100010800ff621e52ff5900000000000b8fb20175070100010801ff621e52ff5900000000000b8fb20175070100010802ff621e52ff5900000000000000000175070100100700ff621b52ff55000001c20175078181c78203ff62ff520004454d480175078181c78205ff62ff52008302097bd1b6e37d93f97c5c2fa1f385fabb84ed2465c8d3d5f14f021fa863929ef62c99f6b53993253fcf3de7c33167f717017507010000090b00620752006554e9f816017507810000090b0062075200650093668e0101016358b500", "hex")); // written by self from 1
/*18*/stream.push(Buffer.from("1B1B1B1B01010101760900000000027CD0236201620072630101760101090000000000D4455B0B0901495452000003A9D9010163CAE900760900000000027CD024620262007263070177010B0901495452000003A9D90172620165014065D67A77078181C78203FF01010101044954520177070100000009FF010101010B0901495452000003A9D90177070100010800FF65000000A201621E52FF6900000000025E647C0177070100010801FF0101621E52FF6900000000025DAC500177070100010802FF0101621E52FF6900000000000027100177070100020800FF65000000A201621E52FF690000000001A7145A0177070100020801FF0101621E52FF690000000001A6ED4A0177070100020802FF0101621E52FF69000000000000271001770701000F0700FF0101621B520065000008860177078181C78205FF010101018302DE66E46911FD0C7D5D5816A7AFB3216E3ED9D51E9AB1E94CFD709E0B058EAF39C8C5F0DCDD434F15F81F19E6184A344401010163CC7000760900000000027CD0256203620072630201710163E2DE0000001B1B1B1B1A022271", "hex")); // From Forum HZ2-C50D-E1-A - extractCurrentPower '2182', extractToPlantPower '2771.6938', extractFromPlantPower '3969.3392' https://www.photovoltaikforum.com/datenlogger-f5/sml-openhab-binding-fuer-ehz-stromzaehler-t102181.html
/*19*/stream.push(Buffer.from("1b1b1b1b01010101760500fa0f5a62006200726301017601010500535a720b0649534b0109770fbeb5010163b61900760500fa0f5b620062007263070177010b0649534b0109770fbeb5070100620affff72620165007c6f957777078181c78203ff010101010449534b0177070100000009ff010101010b0649534b0109770fbeb50177070100010800ff650000018201621e52ff590000000000b25e0a0177070100010801ff0101621e52ff590000000000b25e0a0177070100010802ff0101621e52ff5900000000000000000177070100100700ff0101621b520055000001660177078181c78205ff01010101830284a8d9da5b10e50a727f842c62b4be092a92dc43dbfa4fd7b9c1ffbde8423c4fe85ea05d3fbff0b02545a83a2df113d9010101630c1100760500fa0f5c620062007263020171016361a2001b1b1b1b1a005b22", "hex"));
/*20*/stream.push(Buffer.from("1B1B1B1B010101017607000E0C4D6C3A620062007263010176010107000E0390CEBE0B06454D4801096D8FCDEE01016328DC007607000E0C4D6C3B620062007263070177010B06454D4801096D8FCDEE070100620AFFFF726201650390F3E07777078181C78203FF0101010104454D480177070100000009FF010101010B06454D4801096D8FCDEE0177070100010800FF6400018201621E52FF560006AAEE630177070100010801FF0101621E52FF560006AAEE630177070100010802FF0101621E52FF5600000000000177070100100700FF0101621B52FF550000198A0177078181C78205FF01726201650390F3E0010183025E55C42C87907119C50ADCE734FD37D8CC42CD856F9E9888D3FD0E3515CEB6269B525CC71A44B9241723B8F83512400D010101636E18007607000E0C4D6C3E62006200726302017101634B1F000000001B1B1B1B1A0379B1", "hex"));
/*21*/stream.push(Buffer.from("1B1B1B1B010101017607000E0C4D6C40620062007263010176010107000E0390CEC00B06454D4801096D8FCDEE01016372A3007607000E0C4D6C41620062007263070177010B06454D4801096D8FCDEE070100620AFFFF726201650390F3E17777078181C78203FF0101010104454D480177070100000009FF010101010B06454D4801096D8FCDEE0177070100010800FF6400018201621E52FF560006AAEE660177070100010801FF0101621E52FF560006AAEE660177070100010802FF0101621E52FF5600000000000177070100100700FF0101621B52FF55000019AE0177078181C78205FF01726201650390F3E2010183025E55C42C87907119C50ADCE734FD37D8CC42CD856F9E9888D3FD0E3515CEB6269B525CC71A44B9241723B8F83512400D0101016342CF007607000E0C4D6C4462006200726302017101630956000000001B1B1B1B1A03277A", "hex"));
/*22*/stream.push(Buffer.from("1B1B1B1B010101017605002933596200620072630101760107FFFFFFFFFFFF05000DBBC90B0A01454D4800005A0A58726201640DC8BB62016362E40076050029335A62006200726307017707FFFFFFFFFFFF0B0A01454D4800005A0A58070100620AFFFF726201640DC8BB7977070100603201010101010104454D480177070100600100FF010101010B0A01454D4800005A0A580177070100010800FF641C0104726201640DC8BB621E52FF6424CBA60177070100010801FF01726201640DC8BB621E52FF62000177070100010802FF01726201640DC8BB621E52FF6424CBA60177070100020800FF01726201640DC8BB621E52FF6339CA0177070100020801FF01726201640DC8BB621E52FF62000177070100020802FF01726201640DC8BB621E52FF6339CA0177070100100700FF0101621B520053045B0101016382CA0076050029335B6200620072630201710163A1C2001B1B1B1B1A007751", "hex"));
/*23*/stream.push(Buffer.from("1B1B1B1B010101017605007476646200620072630101760107FFFFFFFFFFFF050026D2220B0A01454D4800005A1F557262016426DDAF62016347460076050074766562006200726307017707FFFFFFFFFFFF0B0A01454D4800005A1F55070100620AFFFF7262016426DDAF7977070100603201010101010104454D480177070100600100FF010101010B0A01454D4800005A1F550177070100010800FF641C81047262016426DDAF621E52FF644640FF0177070100010801FF017262016426DDAF621E52FF62000177070100010802FF017262016426DDAF621E52FF644640FF0177070100020800FF017262016426DDAF621E52FF6333250177070100020801FF017262016426DDAF621E52FF62000177070100020802FF017262016426DDAF621E52FF6333250177070100100700FF0101621B5200530C6B010101637E98007605007476666200620072630201710163B336001B1B1B1B1A007AD2", "hex"));
/*24*/stream.push(Buffer.from("1B1B1B1B010101017607001000D9ABAA620062007263010176010107001001698E8E0B06454D480104C56BCCB10101632D2E007607001000D9ABAB620062007263070177010B06454D480104C56BCCB10172620165016934877777078181C78203FF0101010104454D480177070100000009FF010101010B06454D480104C56BCCB10177070100010800FF63018201621E52FF560003EE4E600177070100010801FF0101621E52FF560003EE4E600177070100010802FF0101621E52FF56000000000001770701000F0700FF0101621B52FF55000010480177078181C78205FF0101010183026E08F5C99793A18AABADA3FDA2EF8DEB232E44EC73D5E143E6624F8D5C7C6F828E67757E23845E3A0F02D2517FBF18FC010101634148007607001000D9ABAE62006200726302017101634A5A00001B1B1B1B1A017DA3", "hex"));
/*25*/stream.push(Buffer.from("1B1B1B1B010101017607000C03A6B2DC620062007263010176010107000C042690F40B06454D4801001D42A7AC01016389E6007607000C03A6B2DD620062007263070177010B06454D4801001D42A7AC01726201650426D5FB7777078181C78203FF0101010104454D480177070100000009FF010101010B06454D4801001D42A7AC0177070100010800FF63018201621E52FF560002076A1D0177070100010801FF0101621E52FF560002076A1D0177070100010802FF0101621E52FF56000000000001770701000F0700FF0101621B52FF55000010710177078181C78205FF010101018302A6FDBC1960703CE4E4E3CDE6F5AFBE529011898B60CBAED88C98DD5C9419D268DB032DB618DEC7F6A275797B86A7EBDB01010163AA21007607000C03A6B2E06200620072630201710163E8A500001B1B1B1B1A015A8B", "hex"));
/*26*/stream.push(Buffer.from("1B1B1B1B0101010176070083000000EC620062007263010176010107008300A8004F0B06454D4801001D4776AE01016367B60076070083000000ED620062007263070177010B06454D4801001D4776AE017262016500A8260F7B77078181C78203FF0101010104454D480177070100000009FF010101010B06454D4801001D4776AE0177070100010800FF63010001621E52FF56000090C8450177070100020800FF63010001621E52FF56000000007E0177070100010801FF0101621E52FF56000090C8450177070100020801FF0101621E52FF56000000007E0177070100010802FF0101621E52FF56000000000001770701000F0700FF0101621B52FF55000000000177078181C78205FF010101018302B96B647BEEA6EE10453758E3888420655B8540C48BB1C4968F6333DB2B043670BDFFFEF5D4CB35140C579F127D7F22230177070100603202040101010163008D017707010060320206010101010101010163AA120076070083000000EF6200620072630201710163A558000000001B1B1B1B1A03735C", "hex"));
/*27*/stream.push(Buffer.from("1b1b1b1b0101010176050471a747620062007263010176010105017b37c10b090149534b0003c2a0a001016339200076050471a748620062007263070177010b090149534b0003c2a0a0070100620affff72620165022b94677a77078181c78203ff010101010449534b0177070100000009ff010101010b090149534b0003c2a0a00177070100010800ff650000018201621e52ff5900000000057aec910177070100010801ff0101621e52ff5900000000057aec910177070100010802ff0101621e52ff5900000000000000000177070100100700ff0101621b520055000000ed0177070100240700ff0101621b5200550000004f0177070100380700ff0101621b5200550000008901770701004c0700ff0101621b520055000000150177078181c78205ff0101010183026340b3539d70e46ac94b3879945918401c8c8bee998cd94c2465c46e12b96e6604842ad3b020820de7d7aa6b973bb9590101016396c90076050471a7496200620072630201710163f841001b1b1b1b1a007116", "hex"));
/*28*/stream.push(Buffer.from("1b1b1b1b01010101760515001cc962006200726301017601010507000997090805353f2d50dffb0101631fa500760515001cca62006200726307017701090805353f2d50dffb070100620affff72620165081f73967a77078181c78203ff010101010449534b0177070100000009ff01010101090805353f2d50dffb0177070100020800ff650001000001621e52ff59000000000a2e65710177070100020801ff0101621e52ff59000000000a2e65710177070100020802ff0101621e52ff5900000000000000000177070100100700ff0101621b520055000000000177070100240700ff0101621b520055000000000177070100380700ff0101621b5200550000000001770701004c0700ff0101621b520055000000000177078181c78205ff010101018302009be62e9f9a76ee597e7d3c1dc7ebc9cc73c852702d52ff4dc8c86eff6d61489289b73d55739eb3815ad0d1fc013c0f01010163e33700760515001ccb6200620072630201710163da440000001b1b1b1b1a021d9f", "hex"));
/*29*/stream.push(Buffer.from("1b1b1b1b01010101760700130884a17d6200620072630101760101070013081fe07f09080c2aec2d4c6b0001016321e000760700130884a17e6200620072630701770109080c2aec2d4c6b000172620165081f8ec97977078181c78203ff0101010104454d480177070100000009ff0101010109080c2aec2d4c6b000177070100010800ff63018201621e52ff5600064febde0177070100020800ff63018201621e52ff56000714e7d80177070100010801ff0101621e52ff5600064febde0177070100020801ff0101621e52ff56000714e7d80177070100010802ff0101621e52ff56000000000001770701000f0700ff0101621b52ff55000021c50177078181c78205ff010101018302c6d6d9343e931bde46e9c326d24c1e681ef435599687805268c132e0fc4f8dbda3d80547fab89438286c04422af3c922010101635d6800760700130884a17f62006200726302017101633a19000000001b1b1b1b1a0320d8", "hex"));
/*30*/stream.push(Buffer.from("1B1B1B1B0101010176053522000062006200726301017601010536220000092823B56300000000010163F5780076053622000062006200726307017701092823B56300000000017262016573EA88587277070100010800FF0101621E52FD590000000000000E81017707000060010AFF010101010B576F686E7A696D6D6572010101630F340076053722000062006200726302017101638AA00000001B1B1B1B1A005433", "hex"));
/*31*/stream.push(Buffer.from("1b1b1b1b0101010176090000000006727c2162016200726301017601010900000000022629620b064841470109a8eb2f5c010163f0ed0076090000000006727c22620162007263070177010b064841470109a8eb2f5c070100620affff72620165038b850ef17677078181c78203ff01010101044841470177070100000009ff010101010b064841470109a8eb2f5c0177070100010800ff628201621e52ff55033c0dde0177070100010801ff0101621e52ff55033be6ce0177070100010802ff0101621e52ff5327100177070100100700ff0101621b52005301810177070100240700ff0101621b52ff53066c01770701001f0700ff0101622152fe53005e0177070100200700ff0101622352fe5359910177070100380700ff0101621b52ff5306a50177070100330700ff0101622152fe5300530177070100340700ff0101622352fe535a5001770701004c0700ff0101621b52ff5302010177070100470700ff0101622152fe53002a0177070100480700ff0101622352fe535a900177070100603200020101620952ff5300f50177078181c78205ff0101010183028dac263c220b9f1d489336b5c0a793a2826273774faf6fb64b41640e45732704e6d59fc08e96016d9dabec88ea55e980017707010060320303010162235200628d01770701006032030401016223520062ef017707010060320003010162095200520a017707010060320004010162095200521d01770701006032000501016209520052090101016344460076090000000006727c2662016200726302017101637ef200001b1b1b1b1a012ad9", "hex"));
/*32*/stream.push(Buffer.from("1b1b1b1b0101010176090000000000204d1162016200726301017601010900000000000ac45c0b0901484147100005ac7f0101637a550076090000000000204d12620162007263070177010b0901484147100005ac7f070100620affff726201640c254b7777078181c78203ff01010101044841470177070100000009ff010101010b0901484147100005ac7f0177070100010800ff628201621e52ff54684fad0177070100010801ff0101621e52ff5468289d0177070100010802ff0101621e52ff5327100177070100100700ff0101621b52005304c70177078181c78205ff0101010183027d6829efa670139c60fc2851321e6ac8563cb7798a406fe613882bcfb91ca2b017f565391cd5f98cb6ea9de3b44a88cd010101630c620076090000000000204d15620162007263020171016389180000001b1b1b1b1a02acaf", "hex"));
/*33*/stream.push(Buffer.from("1b1b1b1b01010101760501d9161962006200726500000101760101074553595133430b064553590104c5431b8701016345c500760501d9161a6200620072650000070177010b064553590104c5431b8701726201650b101a9af10077078181c78203ff01010101044553590177070101010800ff634190726201650b101a9a621e52fc69000000284e66063c0177070102020800ff634190726201650b101a9a621e52fc69000000174514a2410177070101010801ff634190726201650b101a9a621e520165001a68040177070101010802ff634190726201650b101a9a621e520165000000710177070101010803ff634190726201650b101a9a621e520165000000710177070101010804ff634190726201650b101a9a621e520165000000700177070101010805ff634190726201650b101a9a621e520165000000710177070101010806ff634190726201650b101a9a621e5201650000007d0177070102020807ff634190726201650b101a9a621e520165000f3f980177070102020808ff634190726201650b101a9a621e520165000000700177070100010700ff0101621b52fe550000a33e0177070100150700ff0101621b52fe55000040100177070100290700ff0101621b52fe5500002c3001770701003d0700ff0101621b52fe55000036fe0177070100600505ff0101010163419001010163d54600760501d9161b62006200726500000201710163eb0e0000001b1b1b1b1a0204bf", "hex"));
// HLYDTZ541 - invalid encoding of one value
/*34*/stream.push(Buffer.from("1B1B1B1B01010101760400000162006200726500000101760101070000011D5C360B0A01484C59020001206A0101637DC60076040000026200620072650000070177010B0A01484C59020001206A0101F10477070100603201010101010104484C590177070100600100FF010101010B0A01484C59020001206A0177070100010800FF65001C010465011D5C36621E52FF6500DDC7560177070100020800FF65001C010465011D5C36621E52FF62000177070100100700FF0101621B52005302C80177070100200700FF0101622352FF6308F10177070100340700FF0101622352FF6308E40177070100480700FF0101622352FF6308EF01770701001F0700FF0101622152FE62260177070100330700FF0101622152FE62C90177070100470700FF0101622152FE62940177070100510701FF01016208520062790177070100510702FF01016208520062F00177070100510704FF010162085200620D017707010051070FFF01016208520063013F017707010051071AFF01016208520063014401770701000E0700FF0101622C52FF6301F30177070100000200000101010109312E30322E3030370177070100605A02010101010105413031410177070100600500FF0101010165001C010401010163522400760400000362006200726500000201710163EBF4000000001B1B1B1B1A03F406", "hex"));
     stream.push(Buffer.from('1b1b1b1b0101010176053ef31f00620062007263010176010102310b0a01445a470003b41ffe726201640aa698620263a6b80076053ff31f00620062007263070177010b0a01445a470003b41ffe070100620affffffff726201640aa6987377070100603201010172620162006200520004445a470177070100600100ffff017262016200620052000b0a01445a470003b41ffe0177070100010800ffff641c01047262016200621e52036266010101635bf600760540f31f006200620072630201710163ac82001b1b1b1b1a002ed3', 'hex'));
describe("TestSmlFileRead", function() {

    it("process all Smls", function() {
        var testIndex = 35;
        /*if (process.argv[2]) {
            testIndex = parseInt(process.argv[2], 10);
            console.log("Use Test " + testIndex);
            if (isNaN(testIndex) || testIndex >= stream.length) {
                testIndex = -1;
            }
        }*/
        if (testIndex == -1) {
            for (var i = 0; i < stream.length; i++) {
                console.log("========================");
                console.log("Start Test " + i);
                expect(runTest(i)).to.be.true;
            }
        } else {
            expect(runTest(testIndex)).to.be.true;
        }
    });
});
