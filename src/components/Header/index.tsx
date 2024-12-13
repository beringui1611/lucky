import Logo from '../../assets/Logo.png';

export const Header = ():JSX.Element => {

    return (
        <header className="bg-slate-800 h-24 flex items-center p-2 w-screen md:px-6">
            <div className="flex justify-between w-screen">
               <img className='w-36 md:w-56' src={Logo} alt='logo-lucky-token'/>
               <w3m-button/>
            </div>
        </header>
    )
}