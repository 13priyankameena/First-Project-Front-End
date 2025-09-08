import React, { useEffect } from "react";
function Profile()
{
    useEffect(() => {
            document.title="Profile | Priyanka";
        },[])
    return(
<div><h2>Profile page</h2></div>
    );
}
export default Profile;


















// import './profile.css';
// import { Link } from "react-router-dom";

// import React, { useEffect } from "react";
// import { RiDashboard3Line } from "react-icons/ri";
// import { LiaSearchSolid } from "react-icons/lia";
// import { MdOutlineEmail } from "react-icons/md";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { RxComponent2 } from "react-icons/rx";
// import { FaWpforms } from "react-icons/fa6";
// import { LiaTableSolid } from "react-icons/lia";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { TbTypography } from "react-icons/tb";
// import { TbFavicon } from "react-icons/tb";
// function Profile()
// {
//     useEffect(() => {
//         document.title="profile | Priyanka";
//     },[])

// // return(
// //     <>
// //    <header>
// //     <div className='commanheader'>
// //         <div className='commanheaderbox1'>Ready Dashboard</div>
// //         <div className='commanheaderbox2'>
// //             <div className='chbx21'>
// //                 <input type="text" placeholder='Search...'></input><LiaSearchSolid />
// //             </div>
// //             <div className='chbx22'>
// //                 <figure><MdOutlineEmail /></figure>
// //                 <figure><IoNotificationsOutline /></figure>
// //                 <div className='imageprofile'></div>
// //             </div>
// //         </div>
// //     </div>
   
    
// //    </header>
// //    <section className='maincontainer'>


// //     <section className='leftcontainer'>
// //         <div class="leftcont1"></div>
// //         <div className='leftcont2'>
           
// //             <nav>

// //             <div className="Profilelink"><RiDashboard3Line /><Link to="/account">Dashboard</Link></div> 
// //             <div className="Profilelink"><RxComponent2 /><Link to="/AboutMe">Components</Link></div> 
// //             <div className="Profilelink"><FaWpforms /><Link to="/account">Forms</Link>
// //             </div> 
// //             <div className="Profilelink"><LiaTableSolid /><Link to="/account">Tables</Link></div>  
// //              <div className="Profilelink"><IoIosNotificationsOutline /><Link to="/account">Notification</Link></div>  
// //               <div className="Profilelink"><TbTypography /><Link to="/account">Typography</Link></div>  
// //                <div className="Profilelink"><TbFavicon /><Link to="/account">Icons</Link></div>  
// //             </nav> 

// //         </div>
// //     </section>


// //     <section className='rightcontainer'>
// //         <div>Components</div>
// //     </section>

// //    </section>


// //  {/* <div className="Profilecontainer">
// //     <div className="Profileleftcontainer"> */}

// // {/* <nav>
// //   <div className="Profilelink"><Link to="/account">Account</Link><FcBusinessman /></div> 
// //   <div className="Profilelink"><Link to="/AboutMe">Aboutus</Link><FcAbout /></div> 
// //   <div className="Profilelink"><Link to="/account">Contact</Link><FcCallback /></div> 
// //   <div className="Profilelink"><Link to="/account">Friends</Link><FaUserFriends /></div>  
// // </nav> */}
// //     {/* </div>

// //  </div> */}
   
// //    </>
// // );
// // }
// // export default Profile;