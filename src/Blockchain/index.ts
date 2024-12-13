import { useReadContract} from "wagmi";
import AbiLucky from './AbiLucky.json';

export const ADDRESS_LCK = "0x68c7f6e29a4E171F088111Cd96BA84219f14B70e";
export const ADDRESS_USDT = "0x55d398326f99059fF775485246999027B3197955";

export const usePrice = () => {
    const priceNow = useReadContract({
        abi: AbiLucky,
        address: ADDRESS_LCK,
        functionName: "priceInUsdt",
    });

    return priceNow.data;
};

export const usePresaleSupply = () => {
    const supplyNow = useReadContract({
        abi: AbiLucky,
        address: ADDRESS_LCK,
        functionName: "presaleSupply"
    })

    return supplyNow.data;
}

export const useBalanceForClaim = (address:string) => {
    const balanceNow = useReadContract({
        abi: AbiLucky,
        address: ADDRESS_LCK,
        functionName: "balanceForClaim",
        args: [address]
    })

    return balanceNow.data;
}

export const useTimeLock = (address:string) => {
    const timeNow = useReadContract({
        abi: AbiLucky,
        address: ADDRESS_LCK,
        functionName: "timeLock",
        args: [address]
    })

    return timeNow.data;
}


