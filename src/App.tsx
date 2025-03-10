import { Header } from "./components/Header";
import USDTFLAG from './assets/usdt.png';
import LUCKYFLAG from './assets/logo-rounded.png';
import Coin from './assets/coins.png';
import { NextChain } from "./components/NextChain";
import { useMemo, useState } from "react";
import { usePrice, usePresaleSupply, ADDRESS_USDT, ADDRESS_LCK, useBalanceForClaim, useTimeLock} from "./Blockchain";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { useAccount, useWriteContract } from "wagmi";
import AbiErc20 from './Blockchain/AbiERC20.json';
import AbiLck from './Blockchain/AbiLucky.json';
import Card from "./components/MathSection";

function App() {
  const [amount, setAmount] = useState<number>(0);
  const [isPayingUSDT, setIsPayingUSDT] = useState<boolean>(true); 
  const price = usePrice();
  const currentPrice = price ? Number(price) / 10 ** 18 : 0;
  const supply = usePresaleSupply();
  const {writeContract, data, error, status} = useWriteContract();
  const {address} = useAccount();
  const balance = useBalanceForClaim(String(address))
  const timeLock = useTimeLock(String(address));
  const calculateAmount = (value: number) => {
    return isPayingUSDT
      ? value / currentPrice 
      : value * currentPrice;
  };

  const handleSwitch = () => {
    setIsPayingUSDT(!isPayingUSDT);
    setAmount(0);
  };

  const handleFullBuy = async () => {
    try {
        let newAmountValidate;

        // Calcular o valor com base no tipo de pagamento
        if (!isPayingUSDT) {
            newAmountValidate = amount * currentPrice;
        } else {
            newAmountValidate = amount;
        }

        // Multiplicar por 10^18 para trabalhar com inteiros e depois converter para BigInt
        const newAmountInWei = BigInt(Math.floor(newAmountValidate * 10 ** 18));

        // Aprovar o contrato para gastar os tokens
        writeContract({
            address: ADDRESS_USDT,
            abi: AbiErc20,
            functionName: "approve",
            args: [ADDRESS_LCK, newAmountInWei]
        });

        // Comprar os tokens usando o contrato
         writeContract({
            address: ADDRESS_LCK,
            abi: AbiLck,
            functionName: "buy",
            args: [newAmountInWei]
        });
        console.log(data, error, status)
        return { data: 'Compra realizada', error: null, status };
    } catch (error) {
        console.error('Erro ao realizar a compra:', error);
        return { data: null, error, status };
    }
  };


  const handleClaim = () => {
    writeContract({
      address: ADDRESS_LCK,
       abi: AbiLck,
       functionName: "claim",
    })
  }

  function formatLargeNumber(number:number) {
    return Number(number / 1e18).toFixed(2);
  }


  type LockInfo = {
    lockDate: string;
    releaseDate: string;
  };
    
  const lockInfo: LockInfo | null = useMemo(() => {
    if (!timeLock) return null;
  
    const lockTimestamp = Number(timeLock); // Converte o timestamp para número
    const lockDate = new Date(lockTimestamp * 1000); // Converte para milissegundos
    const releaseDate = new Date((lockTimestamp + 30 * 24 * 60 * 60) * 1000); // Adiciona 30 dias
  
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    const formattedLockDate = lockDate.toLocaleDateString('en-US', options);
    const formattedReleaseDate = releaseDate.toLocaleDateString('en-US', options);
  
    return { lockDate: formattedLockDate, releaseDate: formattedReleaseDate };
  }, [timeLock]);

  function accountSell(){
    return Math.min(
      (Number(supply) / 200_000_000 * 10 ** 18) * 100,
      100)
  }

  return (
    <div className="bg-medium min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Header />
      <img
        className="absolute left-0 w-[500px] top-20 hidden lg:block"
        src={Coin}
        alt="lucky-coins-3d"
      />
      <img
        className="absolute right-0 w-[500px] top-20 hidden lg:block"
        src={Coin}
        alt="lucky-coins-3d"
      />
      <div className="flex flex-col mt-20 p-2 md:w-6/12  w-[99.9%]">
        <div className="bg-slate-800 flex flex-col items-center p-2 rounded-md">
          <div className="flex flex-col items-center w-full bg-slate-900 rounded-md">
            <h4 className="text-white text-xl font-bold">Lucky Private Sale</h4>
            <p className="text-white text-3xl">
              LCK {formatLargeNumber(Number(supply))} / 200M
            </p>
            <div className="border-2 border-medium w-[90%] mb-2 rounded-md" >
            <div className="flex gap-2 text-sm text-slate-400 bg-medium bg-opacity-30 p-1"
             style={{
              width: `${accountSell}%`,
            }}>
              <div className="flex w-full px-2 justify-between">
                <label className="ml-2 md:ml-16">Current: ${currentPrice.toFixed(3)}</label>
                <label className="ml-2 md:ml-36">Next: ${(currentPrice + 0.001).toFixed(3)}<br/>100K</label>
                <label className="ml-2 md:ml-36">Next: ${(currentPrice + 0.002).toFixed(3)}<br/>1M</label>
                <label className="ml-2 md:ml-36">Next: ${(currentPrice + 0.003).toFixed(3)}<br/>10M</label>
              </div>
            </div>
            </div>
          </div>

          <article
            className="flex flex-col items-center justify-center gap-1 pb-2 transition-all duration-500 ease-in-out"
          >
            <div className="w-full p-2 bg-slate-900 rounded-md mt-2">
              <div className="flex justify-between items-center md:justify-around">
                <div className="flex flex-col items-start text-slate-400 font-semibold">
                  <label>{isPayingUSDT ? "You pay" : "You get"}</label>
                  <input
                    className="text-2xl bg-transparent w-10/12 outline-none"
                    placeholder="0"
                    type="number"
                    value={amount > 0 ? amount : ""}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
                <div className="bg-slate-950 p-2 rounded-lg flex flex-col items-center justify-center">
                  <button className="flex gap-2 font-semibold text-xl text-slate-400 items-center justify-center">
                    <img
                      className="w-6"
                      src={isPayingUSDT ? USDTFLAG : LUCKYFLAG}
                      alt="currency-icon"
                    />
                    {isPayingUSDT ? "USDT" : "LCK"}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSwitch}
              className="text-2xl text-medium transition-transform duration-500 ease-in-out transform hover:scale-110"
            >
              <ImportExportIcon fontSize="large" />
            </button>

            <div className="w-full p-2 bg-slate-900 rounded-md mt-2">
              <div className="flex justify-between items-center md:justify-around">
                <div className="flex flex-col items-start text-slate-400 font-semibold">
                  <label>{isPayingUSDT ? "You get" : "You pay"}</label>
                  <input
                    className="text-2xl bg-transparent w-10/12 outline-none"
                    readOnly
                    value={amount > 0 ? calculateAmount(amount).toFixed(2) : "0"}
                  />
                </div>
                <div className="bg-slate-950 p-2 rounded-lg">
                  <button className="flex gap-2 font-semibold text-xl text-slate-400 items-center justify-center">
                    <img
                      className="w-6"
                      src={isPayingUSDT ? LUCKYFLAG : USDTFLAG}
                      alt="currency-icon"
                    />
                    {isPayingUSDT ? "LCK" : "USDT"}
                  </button>
                </div>
              </div>
            </div>
          </article>

          <button onClick={handleFullBuy} 
           className="bg-light text-white w-10/12 p-2 text-xl font-bold rounded-lg mt-2 animate-pulse">
            BUY $LCK
          </button>
        </div>
      </div>
      
      <div className="w-10/12 bg-slate-800 rounded-lg grid grid-cols-2 justify-around md:w-6/12 p-2">
          {/* Informações do Saldo */}
          <div className="p-2 w-full flex flex-col items-center justify-center">
            <h3 className="text-white text-xl font-bold">My Balance</h3>
            <p className="text-white">LCK 
              {
              (Number(Number(balance) >= 0 ? balance : "0") / 1e18).toFixed(2) 
              }</p>
            {/* Botão Centralizado na Parte Inferior */}
            <div className="col-span-2 flex justify-center items-center mt-4">
              <button
                onClick={handleClaim}
                className="bg-light w-[100px] p-2 text-white font-bold rounded-md"
              >
                Claim
              </button>
            </div>
          </div>

          {/* Informações do Time Lock */}
          <div className="p-2 w-full">
            <h3 className="text-white text-xl font-bold">Time Lock</h3>
            {lockInfo ? (
              <div className="text-white flex flex-col gap-2">
                <p><span className="text-red-600">Locked on:</span> {String(lockInfo.lockDate)}</p>
                <p><span className="text-green-400">Released on: </span>{String(lockInfo.releaseDate)}</p>
              </div>
            ) : (
              <p className="text-medium animate-pulse">Loading...</p>
            )}
          </div>
      </div>
      <Card/>
      <NextChain />
    </div>
  );
}

export default App;
