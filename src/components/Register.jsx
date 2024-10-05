import "./Register.css"

function Register (){
    function handleClick(){
        document.querySelector("input").value?(document.querySelector("input").style.border="2px solid"):(document.querySelector("input").style.border="2px solid red");
        document.querySelectorAll("input")[1].value?(document.querySelectorAll("input")[1].style.border="2px solid"):(document.querySelectorAll("input")[1].style.border="2px solid red");
        if(document.querySelector("input").value && document.querySelectorAll("input")[1].value){
            fetch("http://localhost:5100/register",{
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
                if(res.userAdded){
                    document.querySelector("#register > div > div:nth-of-type(2)").style.display="block";
                    document.querySelector("#register > div > div:nth-of-type(2)").innerHTML="User added successfully";
                    document.querySelector("#register > div > div:nth-of-type(2)").style.background="rgb(126, 238, 151)";
                }else if(res.code==11000){
                    document.querySelector("#register > div > div:nth-of-type(2)").style.display="block";
                    document.querySelector("#register > div > div:nth-of-type(2)").innerHTML="User already exists";
                    document.querySelector("#register > div > div:nth-of-type(2)").style.background="rgb(238, 152, 126)";
                }
                setTimeout(()=>{
                    document.querySelector("#register > div > div:nth-of-type(2)").style.display="none";
                },2000)
            })
        }
    }
    return(
        <>
            <section id="register">
                <div>
                    <h1>User Registration</h1>
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
                            <button onClick={handleClick}>Register</button>
                        </div>
                    </div>
                    <div></div>
                </div>
            </section>
        </>
    )
}

export default Register;