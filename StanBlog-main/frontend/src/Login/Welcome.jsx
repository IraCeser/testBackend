import LogoName from "./LogoName.jsx"
import SignInWays from "./SignInWays.jsx"
function Welcome(){
    return(
        <div className="welcome">
            <div className="welcome-left-side">
                <div className="welcome-header">
                    <LogoName/>
                </div>
                <div className="sign-in-ways">
                    <SignInWays/>
                </div>
            </div>
            <div className="welcome-right-side">
                <p className="StanBlog-title"></p>
                <img src="./slike/zgrade.jpg"/>
            </div>
        </div>
    )
}
export default Welcome