import { useReadContract} from "wagmi";
import AbiLucky from './AbiLucky.json';

export const ADDRESS_LCK = "0xa26ac75EF8BbD3DCFB56fe10027433A0e5069B21";
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


