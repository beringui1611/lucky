import TokenomicsImage from '../../assets/tokenomics.png';
import CalculateIcon from '@mui/icons-material/Calculate';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';

const features = [
  {
    name: 'Gradual Token Release Strategy',
    description:
      "The release of tokens purchased during the Lucky presale will be done gradually. After the claim is initiated by the Lucky team, users will be able to claim 10% of their purchased tokens each month. This approach ensures efficient liquidity control and prevents significant market fluctuations immediately after the presale, benefiting both investors and the token's stability.",
    icon: <CalculateIcon/>,
  },
  {
    name: 'Full Withdrawal After the Sixth Month',
    description: 'Starting from the sixth month, users will have the flexibility to withdraw all remaining tokens. This means those who choose to wait can access 100% of their accumulated tokens, using or trading them freely. This timeline provides short-term stability for the project while incentivizing token retention as the market matures.',
    icon: <AccountBalanceWalletIcon/>,
  },
  {
    name: 'Benefits for Users and the Project',
    description: "The staggered release model offers advantages for both users and the project: For users: A gradual token release allows them to benefit from potential token appreciation, achieving higher returns over time. For the project: This approach manages market selling pressure, ensuring healthy liquidity and price stability. It protects the token's value and promotes sustainable adoption.",
    icon: <SavingsIcon/>,
  },
]

export default function Card() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32 w-full mt-96">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-light">Make money with us</h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Lucky strategy claim
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
              Understand our claim strategy and how it will benefit all investors by maximizing their profits.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="font-semibold text-gray-900 flex gap-2">
                    <p className='className="absolute left-1 top-1 size-5 text-indigo-600"'>{feature.icon}</p>
                    {feature.name}
                    </dt>
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className='ml-32'>
          <img
            alt="Product screenshot"
            src={TokenomicsImage}
            width={500}
            height={500}
            className="w-[20rem] rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[30rem] md:-ml-24 lg:-ml-20  md:mt-64"
          />
          </div>
        </div>
      </div>
    </div>
  )
}
