import SearchContact from "./contact/SearchContact";

const Navbar = () => {
    return (<nav className='navbar navbar-dark navbar-expand-sm shadow-lg'>
        <div className='container'>
            <div className='row w-100'>
                <div className='col'>
                    <i className='fa fa-id-badge'/>
                    Verwaltung von Webanwendungen {" "}
                    <span style={{color: 'purple'}}>Kontakte</span>
                </div>
                <div className='col'>
                    <SearchContact/>
                </div>
            </div>
        </div>
    </nav>)
}

export default Navbar;