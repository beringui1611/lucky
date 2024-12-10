import NXCERTIFIED from '../../assets/certifie.png';
import RabbitCreateCoin from '../../assets/Rabbit_CreatingCoins_CORRECTION.png';


export const NextChain = ():JSX.Element => {

    return (
        <div className='bg-slate-900 w-screen flex justify-around items-center flex-col lg:flex-row'>
            <section>
                <div className="flex flex-col p-2">
                    <h5 className="text-medium font-bold text-xl">COMMUNITY DRIVEN</h5>
                    <p className="text-sm text-white font-semibold">Our smart contract was developed and audit by NextChain, check out our code in the github repository</p>
                    <a className="text-semibold text-blue-700 underline font-semibold">NextChain Github</a>
                </div>
                <div className='text-white font-bold text-sm p-2'>
                    <img className='rounded-lg' src={NXCERTIFIED} alt='certified-nxchain'/>
                    <a className='underline' href='https://www.nxchain.link'>Verify certification on NextChain WebSite - Code: 10002</a>
                </div>
            </section>

            <section>
                <div className='hidden lg:block'>
                    <img className='w-96' src={RabbitCreateCoin} alt='rabbit-lucky-create-coin'/>
                </div> 
            </section>
        </div>
    )
}