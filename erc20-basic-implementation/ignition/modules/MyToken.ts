import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Token", (m) => {
  const myToken = m.contract("MyToken",[1000n]);  
  return { myToken };
});