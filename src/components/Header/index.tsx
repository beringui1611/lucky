import Logo from '../../assets/Logo.png';

export const Header = ():JSX.Element => {

    return (
        <header className="bg-slate-800 h-24 flex items-center p-2 w-screen">
            <div className="flex justify-between w-screen">
               <img className='w-36' src={Logo} alt='logo-lucky-token'/>
               <appkit-button/>
            </div>
        </header>
    )
}