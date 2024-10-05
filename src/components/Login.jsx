import "./Login.css";
import jwtTokenContext from "../utils/jwtTokenContext";
import { useContext } from "react"
function Login(){
    let jwtToken=useContext(jwtTokenContext)
    function handleClick(){
        fetch("http://localhost:5100/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                userName:document.querySelector("input").value,
                password:document.querySelectorAll("input")[1].value
            })
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.loginStatus){
                document.querySelectorAll("#login > div > div")[1].innerHTML="Login Successfull";
                document.querySelectorAll("#login > div > div")[1].style.background="rgb(126, 238, 151)";
                document.querySelectorAll("#login > div > div")[1].style.display="block";
                setTimeout(()=>{
                    document.querySelectorAll("#login > div > div")[1].style.display="none";
                },2000)
                jwtToken.setjwtToken(res.token);
            }else{
                document.querySelectorAll("#login > div > div")[1].innerHTML="Login Unsuccessfull";
                document.querySelectorAll("#login > div > div")[1].style.background="rgb(238, 152, 126)";
                document.querySelectorAll("#login > div > div")[1].style.display="block";
                setTimeout(()=>{
                    document.querySelectorAll("#login > div > div")[1].style.display="none";
                },2000)
            }
            
        });
    }
    return(
        <>
            <section id="login">
                <div>
                    <h1>Login</h1>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>User Name:</td>
                                    <td><input/></td>
                                </tr>
                                <tr>
                                    <td>Password:</td>
                                    <td><input type="password"/></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={handleClick}>Login</button>
                        </div>
                    </div>
                    <div></div>
                </div>
            </section>
        </>
    )
}

export default Login;