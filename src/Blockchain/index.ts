import { useReadContract} from "wagmi";
import AbiLucky from './AbiLucky.json';

export const ADDRESS_LCK = "0x4AFCeae49A3412278c0Fa57D0522DBeC70c50505";
export const ADDRESS_USDT = "0x02542cee9a0dbb625d7d595215581A18d3a15e95";

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


