import { useNavigate } from "react-router-dom"
import Button from "./Button"

const User = ({name, id}) => {

    const navigate = useNavigate();

    return (<>
        <div className='flex justify-between align-center shadow p-2 mt-2 h-fit rounded-md'>
            <div className="flex items-center gap-2 h-full">
                <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-md">
                        {name.split("")[0]}
                    </div>
                </div>
                <div className="text-lg font-bold ">{name}</div>
            </div>
            <div className="w-30 text-sm">
                <Button onClick={(e)=>{
                    navigate(`/send?id=${id}&name=${name}`)
                }}>Send Money</Button>
            </div>
        </div>
    </>)
}

export default User