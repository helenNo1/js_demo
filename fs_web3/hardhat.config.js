require("@nomicfoundation/hardhat-toolbox");
require('hardhat-abi-exporter');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
 networks: {
        // 定义名为testnet的链:
        testnet: {
            // 配置私钥:
            accounts: ['0x8dac07b270b4917bf1c94188800fa92a132790e716eaab0dd584e10e56cd53f4'],
            // 配置为Polygon Testnet节点的PRC:
            url: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
        }
    },
abiExporter: {
        // 输出到abi目录:
        path: "./abi",
        clear: false,
        flat: true,
        pretty: false,
        // 编译时输出:
        runOnCompile: true,
    }
};
